import { genPageMetadata } from "app/seo";
import Terminal from "@/components/Terminal";


export const metadata = genPageMetadata({ title: "Terminal" });

export default function TerminalPage() {
  return <Terminal />;
}
