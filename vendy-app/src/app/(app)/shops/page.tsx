import { redirect } from "next/navigation";

export default function ShopsRedirect() {
  redirect("/browse?tab=boutiques");
}
