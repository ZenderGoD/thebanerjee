import { redirect } from "next/navigation";

// The old detail page now lives in the story on the home page.
export default function Help() {
  redirect("/");
}
