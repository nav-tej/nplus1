"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`;
      }
      posthog.capture("$pageview", {
        $current_url: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

export default function PostHogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const key = "phc_d9MSoskPDFg6YCeWn4FLvqzVlV26d4G0NB1rTSQoRWo";
    const host = "https://us.i.posthog.com";
    
    console.log("PostHog Diagnostic: Initializing with key starting with", key.substring(0, 8));
    
    if (key) {
      posthog.init(key, {
        api_host: host,
        ui_host: "https://us.posthog.com",
        person_profiles: "always",
        capture_pageview: false, 
        capture_pageleave: true,
        autocapture: true,
        loaded: (ph) => {
          console.log("PostHog Diagnostic: Successfully loaded");
          if (process.env.NODE_ENV === "development") ph.debug();
        },
      });
    }
  }, []);

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
