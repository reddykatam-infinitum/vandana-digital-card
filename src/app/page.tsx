import { redirect } from "next/navigation";
import { cards } from "@/data/cards";

export default function Home() {
  redirect(`/${cards[0].slug}`);
}
