"use client"

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { motion, MotionProps, useInView } from "motion/react"

import { cn } from "@/lib/utils"

interface SequenceContextValue {
  scrollProgress: number
  totalItems: number
  sequenceStarted: boolean
}

const SequenceContext = createContext<SequenceContextValue | null>(null)

const useSequence = () => useContext(SequenceContext)

const ItemIndexContext = createContext<number | null>(null)
const useItemIndex = () => useContext(ItemIndexContext)

interface AnimatedSpanProps extends MotionProps {
  children: React.ReactNode
  delay?: number
  className?: string
  startOnView?: boolean
}

export const AnimatedSpan = ({
  children,
  delay = 0,
  className,
  startOnView = false,
  ...props
}: AnimatedSpanProps) => {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  })

  const sequence = useSequence()
  const itemIndex = useItemIndex()
  
  const shouldAnimate = useMemo(() => {
    if (!sequence || itemIndex === null) {
      return startOnView ? isInView : true
    }
    if (!sequence.sequenceStarted) return false
    
    // Calculate which item should be visible based on scroll progress
    // scrollProgress is already mapped to item progress (0-1 range representing items)
    const visibleItemIndex = sequence.scrollProgress * sequence.totalItems
    // Add small buffer to ensure items are visible when they should be
    return itemIndex <= Math.ceil(visibleItemIndex + 0.1)
  }, [sequence, itemIndex, startOnView, isInView])

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, y: -5 }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: -5 }}
      transition={{ duration: 0.3, delay: sequence ? 0 : delay / 1000 }}
      className={cn("grid text-sm font-normal tracking-tight", className)}
      {...props}
    >
      {children}
    </motion.div>
  )
}

interface TypingAnimationProps extends MotionProps {
  children: string
  className?: string
  duration?: number
  delay?: number
  as?: React.ElementType
  startOnView?: boolean
}

export const TypingAnimation = ({
  children,
  className,
  duration = 60,
  delay: _delay = 0,
  as: Component = "span",
  startOnView = true,
  ...props
}: TypingAnimationProps) => {
  if (typeof children !== "string") {
    throw new Error("TypingAnimation: children must be a string. Received:")
  }

  const MotionComponent = useMemo(
    () =>
      motion.create(Component, {
        forwardMotionProps: true,
      }),
    [Component]
  )

  const [displayedText, setDisplayedText] = useState<string>("")
  const elementRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(elementRef as React.RefObject<Element>, {
    amount: 0.3,
    once: true,
  })

  const sequence = useSequence()
  const itemIndex = useItemIndex()

  useEffect(() => {
    if (!sequence || itemIndex === null || !sequence.sequenceStarted) {
      if (!sequence && startOnView && isInView) {
        let i = 0
        const typingEffect = setInterval(() => {
          if (i < children.length) {
            setDisplayedText(children.substring(0, i + 1))
            i++
          } else {
            clearInterval(typingEffect)
          }
        }, duration)
        return () => clearInterval(typingEffect)
      }
      return
    }

    // Calculate item-specific progress based on scroll
    const visibleItemIndex = sequence.scrollProgress * sequence.totalItems
    
    if (itemIndex > visibleItemIndex) {
      // Item hasn't been reached yet
      setDisplayedText("")
      return
    }
    
    if (itemIndex < Math.floor(visibleItemIndex - 0.01)) {
      // Item is fully visible (with small threshold to avoid flicker)
      setDisplayedText(children)
      return
    }
    
    // Item is partially visible - calculate typing progress within this item
    const fractionalPart = visibleItemIndex - Math.floor(visibleItemIndex)
    const targetLength = Math.max(1, Math.floor(fractionalPart * children.length))
    setDisplayedText(children.substring(0, targetLength))
  }, [sequence?.scrollProgress, sequence?.sequenceStarted, itemIndex, sequence?.totalItems, children, duration, startOnView, isInView, sequence])

  return (
    <MotionComponent
      ref={elementRef}
      className={cn("text-sm font-normal tracking-tight", className)}
      {...props}
    >
      {displayedText}
    </MotionComponent>
  )
}

interface TerminalProps {
  children: React.ReactNode
  className?: string
  sequence?: boolean
  startOnView?: boolean
}

export const Terminal = ({
  children,
  className,
  sequence = true,
  startOnView: _startOnView = true,
}: TerminalProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scrollContainerRef = useRef<HTMLPreElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [hasReachedBottom, setHasReachedBottom] = useState(false)
  const [animationProgress, setAnimationProgress] = useState(0)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [commandInput, setCommandInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    const checkBottomReached = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      
      // Check if user has scrolled to bottom (with 100px threshold)
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 100
      
      if (isAtBottom && !hasReachedBottom) {
        setHasReachedBottom(true)
      }
    }

    checkBottomReached()
    window.addEventListener("scroll", checkBottomReached, { passive: true })
    window.addEventListener("resize", checkBottomReached)
    
    return () => {
      window.removeEventListener("scroll", checkBottomReached)
      window.removeEventListener("resize", checkBottomReached)
    }
  }, [hasReachedBottom])

  // Animate progress when bottom is reached
  useEffect(() => {
    if (!hasReachedBottom || !sequence) return

    const totalItems = Children.count(children)
    if (totalItems === 0) return

    const animationDuration = 5000 // 5 seconds total for all items
    const steps = totalItems
    const stepDuration = animationDuration / steps

    let currentStep = 0
    const interval = setInterval(() => {
      currentStep++
      const progress = Math.min(currentStep / steps, 1)
      setAnimationProgress(progress)
      
      if (progress >= 1) {
        clearInterval(interval)
        setAnimationComplete(true)
        // Focus input after animation completes
        setTimeout(() => {
          inputRef.current?.focus()
        }, 100)
      }
    }, stepDuration)

    return () => clearInterval(interval)
  }, [hasReachedBottom, sequence, children])

  const sequenceHasStarted = sequence ? hasReachedBottom : false
  const totalItems = useMemo(() => {
    if (!sequence) return 0
    return Children.count(children)
  }, [sequence, children])

  // Map animation progress to item reveal progress
  const itemProgress = useMemo(() => {
    if (!sequence) return 0
    if (totalItems === 0) return 0
    
    // animationProgress goes from 0 to 1, map to all items
    const visibleItemIndex = animationProgress * totalItems
    return visibleItemIndex / totalItems
  }, [animationProgress, totalItems, sequence])

  const contextValue = useMemo<SequenceContextValue | null>(() => {
    if (!sequence) return null
    return {
      scrollProgress: itemProgress,
      totalItems,
      sequenceStarted: sequenceHasStarted,
    }
  }, [sequence, itemProgress, totalItems, sequenceHasStarted])

  // Command execution logic
  const executeCommand = (cmd: string): React.ReactNode => {
    const trimmedCmd = cmd.trim()
    if (!trimmedCmd) return null

    const parts = trimmedCmd.split(/\s+/)
    const command = parts[0]
    const args = parts.slice(1)

    switch (command) {
      case "whoami":
        return (
          <>
            <AnimatedSpan>
              <span className="text-green-400">→</span> Bishal Banerjee
            </AnimatedSpan>
            <AnimatedSpan className="opacity-50">Full-Stack Engineer & AI/ML Specialist</AnimatedSpan>
          </>
        )
      
      case "cat":
        const file = args[0]
        if (!file) {
          return <AnimatedSpan className="text-red-400">→ Error: cat requires a filename</AnimatedSpan>
        }
        
        const fileContent: Record<string, React.ReactNode> = {
          "contact.txt": (
            <>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Email: bishal@bebishal.com
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Website: bebishal.com
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Phone: +91-9972801985
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Location: Vellore, India
              </AnimatedSpan>
            </>
          ),
          "summary.txt": (
            <>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Engineer focused on building scalable AI-powered products
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Strong system design, production deployment, and ML optimization experience
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Shipped multiple live platforms, authored multi-modal AI research
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Optimized real-world inference pipelines
              </AnimatedSpan>
            </>
          ),
          "experience.txt": (
            <>
              <AnimatedSpan className="mt-2 text-yellow-300">=== IMAI Studio — Backend & Full-Stack Engineer ===</AnimatedSpan>
              <AnimatedSpan className="opacity-75">Jan 2025 – Present</AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Architected AI platform serving 10K+ DAUs with 99.9% uptime
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Reduced API latency by 50% via system and ML optimization
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Improved inference performance by 30% through model analysis
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Led CI/CD pipelines reducing deployment time from hours to minutes
              </AnimatedSpan>
              <AnimatedSpan className="mt-4 text-yellow-300">=== The House of RARE — Data Science Engineer (Trainee) ===</AnimatedSpan>
              <AnimatedSpan className="opacity-75">Jun 2024 – Dec 2024</AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Built ETL pipelines and ML models for business forecasting
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Designed PowerBI dashboards enabling data-driven decisions
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Optimized SQL queries and data validation for 99.9% data integrity
              </AnimatedSpan>
            </>
          ),
          "projects.txt": (
            <>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Forest Fire & Cyclone Detection — Vision Transformers on satellite imagery (92%+ accuracy)
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Multi-Modal Stock Market Prediction — NLP + time-series ML with 15% uplift
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Outfit Recommendation System — GenAI-powered conversational recommender
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> IMAI Backend System — scalable AI infra with 30% inference optimization
              </AnimatedSpan>
            </>
          ),
          "skills.txt": (
            <>
              <AnimatedSpan className="text-cyan-300">Languages:</AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Python, JavaScript, TypeScript, SQL
              </AnimatedSpan>
              <AnimatedSpan className="text-cyan-300">Frameworks:</AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> Next.js, React, FastAPI, Flask
              </AnimatedSpan>
              <AnimatedSpan className="text-cyan-300">AI/ML:</AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> PyTorch, TensorFlow, Transformers, CV, NLP, Multi-modal
              </AnimatedSpan>
              <AnimatedSpan className="text-cyan-300">Infra:</AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> AWS, GCP Vertex AI, Azure ML, Cloudflare, Docker, CI/CD
              </AnimatedSpan>
            </>
          ),
          "education.txt": (
            <>
              <AnimatedSpan>
                <span className="text-green-400">→</span> M.Tech CSE (AI & ML) — VIT Vellore (CGPA: 8.05)
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> B.Tech Mechatronics — REVA University (CGPA: 8.4)
              </AnimatedSpan>
              <AnimatedSpan>
                <span className="text-green-400">→</span> B.S. Data Science — IIT Madras (CGPA: 7.95)
              </AnimatedSpan>
            </>
          ),
        }

        if (fileContent[file]) {
          return fileContent[file]
        } else {
          return <AnimatedSpan className="text-red-400">→ Error: File &apos;{file}&apos; not found</AnimatedSpan>
        }
      
      case "help":
        return (
          <>
            <AnimatedSpan className="text-blue-400">
              <span className="text-green-400">→</span> Available commands:
            </AnimatedSpan>
            <AnimatedSpan className="text-cyan-300 ml-4">  whoami</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300 ml-4">  cat [contact|summary|experience|projects|skills|education].txt</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300 ml-4">  theme [color] - Change background (colors: dark, blue, purple, green, red, orange, pink)</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300 ml-4">  refresh / reload - Refresh the page</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300 ml-4">  date - Show current date and time</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300 ml-4">  neofetch - Display system info</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300 ml-4">  ls - List available files</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300 ml-4">  echo [text] - Echo text</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300 ml-4">  quit / exit - Close the tab</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300 ml-4">  clear - Clear terminal</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300 ml-4">  help - Show this help</AnimatedSpan>
          </>
        )
      
      case "clear":
        setCommandHistory([])
        return null
      
      case "echo":
        const text = args.join(" ")
        return <AnimatedSpan className="text-blue-400">→ {text}</AnimatedSpan>
      
      case "theme":
      case "color":
        const color = args[0]?.toLowerCase()
        const colorMap: Record<string, { from: string; via: string; to: string }> = {
          dark: { from: "#030712", via: "#050816", to: "#04060f" },
          blue: { from: "#0a1929", via: "#0d1f3a", to: "#0b1a2f" },
          purple: { from: "#1a0a2e", via: "#2d0a4e", to: "#1f0a3a" },
          green: { from: "#0a2e1a", via: "#0d3a22", to: "#0b2e1f" },
          red: { from: "#2e0a0a", via: "#3a0d0d", to: "#2f0b0b" },
          orange: { from: "#2e1a0a", via: "#3a220d", to: "#2f1b0b" },
          pink: { from: "#2e0a1a", via: "#3a0d22", to: "#2f0b1f" },
          reset: { from: "#030712", via: "#050816", to: "#04060f" },
        }
        
        if (color && colorMap[color]) {
          const colors = colorMap[color]
          if (typeof document !== "undefined") {
            const root = document.querySelector(".min-h-screen")
            if (root instanceof HTMLElement) {
              root.className = root.className.replace(/bg-linear-to-br from-\[#[^\]]+\] via-\[#[^\]]+\] to-\[#[^\]]+\]/g, "")
              root.style.background = `linear-gradient(to bottom right, ${colors.from}, ${colors.via}, ${colors.to})`
            }
          }
          return <AnimatedSpan className="text-green-400">→ Background theme changed to {color}</AnimatedSpan>
        } else {
          return (
            <>
              <AnimatedSpan className="text-red-400">→ Invalid color. Available colors:</AnimatedSpan>
              {Object.keys(colorMap).filter(k => k !== "reset").map(c => (
                <AnimatedSpan key={c} className="text-cyan-300 ml-4">  {c}</AnimatedSpan>
              ))}
            </>
          )
        }
      
      case "refresh":
      case "reload":
        if (typeof window !== "undefined") {
          setTimeout(() => window.location.reload(), 500)
          return <AnimatedSpan className="text-yellow-400">→ Refreshing page...</AnimatedSpan>
        }
        return null
      
      case "date":
        const now = new Date()
        const dateStr = now.toLocaleString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZoneName: "short"
        })
        return <AnimatedSpan className="text-blue-400">→ {dateStr}</AnimatedSpan>
      
      case "neofetch":
        return (
          <>
            <AnimatedSpan className="text-cyan-300">                    _</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300">        __   ___.  (_)  .__   .__</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300">       /  \\  \\_  \\ |  |  |  |  |__|</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300">       \\   \\  /    \\|  |  |  |  |  |</AnimatedSpan>
            <AnimatedSpan className="text-cyan-300">        \\___/ /\\____/|__|  |__|  |__|</AnimatedSpan>
            <AnimatedSpan> </AnimatedSpan>
            <AnimatedSpan className="text-green-400">OS:</AnimatedSpan>
            <AnimatedSpan className="text-white ml-4">Portfolio Website</AnimatedSpan>
            <AnimatedSpan className="text-green-400">Host:</AnimatedSpan>
            <AnimatedSpan className="text-white ml-4">bebishal.com</AnimatedSpan>
            <AnimatedSpan className="text-green-400">Kernel:</AnimatedSpan>
            <AnimatedSpan className="text-white ml-4">Next.js 15</AnimatedSpan>
            <AnimatedSpan className="text-green-400">Uptime:</AnimatedSpan>
            <AnimatedSpan className="text-white ml-4">Always online</AnimatedSpan>
            <AnimatedSpan className="text-green-400">Shell:</AnimatedSpan>
            <AnimatedSpan className="text-white ml-4">Interactive Terminal</AnimatedSpan>
            <AnimatedSpan className="text-green-400">Theme:</AnimatedSpan>
            <AnimatedSpan className="text-white ml-4">Dark Mode</AnimatedSpan>
            <AnimatedSpan className="text-green-400">Engineer:</AnimatedSpan>
            <AnimatedSpan className="text-white ml-4">Bishal Banerjee</AnimatedSpan>
          </>
        )
      
      case "ls":
        return (
          <>
            <AnimatedSpan className="text-cyan-300">Available files:</AnimatedSpan>
            <AnimatedSpan className="text-green-400 ml-4">contact.txt</AnimatedSpan>
            <AnimatedSpan className="text-green-400 ml-4">summary.txt</AnimatedSpan>
            <AnimatedSpan className="text-green-400 ml-4">experience.txt</AnimatedSpan>
            <AnimatedSpan className="text-green-400 ml-4">projects.txt</AnimatedSpan>
            <AnimatedSpan className="text-green-400 ml-4">skills.txt</AnimatedSpan>
            <AnimatedSpan className="text-green-400 ml-4">education.txt</AnimatedSpan>
          </>
        )
      
      case "quit":
      case "exit":
        if (typeof window !== "undefined") {
          // Try to close the window/tab first
          const wasOpenedByJS = window.opener !== null || window.history.length <= 1
          
          if (wasOpenedByJS) {
            setTimeout(() => {
              window.close()
            }, 500)
            return <AnimatedSpan className="text-yellow-400">→ Closing tab...</AnimatedSpan>
          } else {
            // If can't close, navigate to a blank page or homepage
            setTimeout(() => {
              window.location.href = "about:blank"
            }, 1000)
            return (
              <>
                <AnimatedSpan className="text-yellow-400">→ Cannot close tab (browser security)</AnimatedSpan>
                <AnimatedSpan className="text-green-400">→ Navigating away...</AnimatedSpan>
              </>
            )
          }
        }
        return null
      
      default:
        return <AnimatedSpan className="text-red-400">→ Command not found: {command}. Type &apos;help&apos; for available commands.</AnimatedSpan>
    }
  }

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!commandInput.trim()) return

    const output = executeCommand(commandInput)
    if (commandInput.trim() !== "clear") {
      setCommandHistory(prev => [...prev, { command: commandInput, output }])
    }
    setCommandInput("")
    setHistoryIndex(-1)
    
    // Scroll to bottom after command
    setTimeout(() => {
      scrollContainerRef.current?.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      })
    }, 10)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCommandInput(commandHistory[newIndex].command)
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1)
          setCommandInput("")
        } else {
          setHistoryIndex(newIndex)
          setCommandInput(commandHistory[newIndex].command)
        }
      }
    }
  }

  const wrappedChildren = useMemo(() => {
    if (!sequence) return children
    const array = Children.toArray(children)
    return array.map((child, index) => (
      <ItemIndexContext.Provider key={index} value={index}>
        {child as React.ReactNode}
      </ItemIndexContext.Provider>
    ))
  }, [children, sequence])

  const content = (
    <div
      ref={containerRef}
      className={cn(
        "border-border bg-background z-0 h-full max-h-[600px] w-full rounded-xl border overflow-hidden",
        className
      )}
    >
      <div className="border-border flex flex-col gap-y-2 border-b p-4 bg-black/20">
        <div className="flex flex-row gap-x-2">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
        </div>
      </div>
      <pre 
        ref={scrollContainerRef}
        className={cn(
          "p-4 bg-black/30 max-h-[500px] overflow-auto"
        )}
      >
        <code className="grid gap-y-1 font-mono text-sm">
          {wrappedChildren}
          {animationComplete && commandHistory.map((item, idx) => (
            <div key={idx} className="grid gap-y-1">
              <div className="text-sm">$ {item.command}</div>
              {item.output}
            </div>
          ))}
          {animationComplete && (
            <form onSubmit={handleCommandSubmit} className="inline-flex items-center gap-1">
              <span>$</span>
              <input
                ref={inputRef}
                type="text"
                value={commandInput}
                onChange={(e) => setCommandInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-inherit"
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
              <span className="animate-pulse">█</span>
            </form>
          )}
        </code>
      </pre>
    </div>
  )

  if (!sequence) return content

  return (
    <SequenceContext.Provider value={contextValue}>
      {content}
    </SequenceContext.Provider>
  )
}

