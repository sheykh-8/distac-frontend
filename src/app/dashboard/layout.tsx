"use client"

import { LoadingSpinner } from "@/components/loading-spinner";
import { useFirebase } from "@/hooks/useFirebase";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { auth } = useFirebase();
  const [user, loading, error] = useAuthState(auth);

  const router = useRouter();

  if (!user) {
    router.replace("/");
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (user) {
    return <TooltipProvider>{children}</TooltipProvider>;
  }

  return null;
}
