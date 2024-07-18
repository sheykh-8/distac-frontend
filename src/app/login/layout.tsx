import { SiteHeader } from "@/components/site-header";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <SiteHeader />
      {children}
    </React.Fragment>
  );
}
