import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <TooltipProvider>{children}</TooltipProvider>;
}
