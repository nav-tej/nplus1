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
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
    
    if (key) {
      console.log("PostHog Diagnostic: Variable detected, initializing...");
      posthog.init(key, {
        api_host: host,
        ui_host: "https://us.posthog.com",
        person_profiles: "always",
        capture_pageview: false, 
        capture_pageleave: true,
        autocapture: true,
        loaded: (ph) => {
          console.log("PostHog Diagnostic: Successfully loaded via environment variable");
          if (process.env.NODE_ENV === "development") ph.debug();
        },
      });
    } else {
      console.error("PostHog Diagnostic: NEXT_PUBLIC_POSTHOG_KEY is missing from environment");
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
