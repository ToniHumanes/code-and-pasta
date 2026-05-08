import { SpeedInsights } from "@vercel/speed-insights/react";
import React from "react";

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SpeedInsights />
    </>
  );
}
