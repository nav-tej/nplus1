"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Before init finishes, the landing pageview is sent from `loaded` below.
    if (pathname && posthog.__loaded) {
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
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
    // Initialize at idle so analytics never competes with first paint on a
    // phone (design system: SEO and performance budgets).
    const idle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(cb, { timeout: 3000 });
      else setTimeout(cb, 1500);
    };

    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com";
    
    if (key) {
      idle(() => posthog.init(key, {
        api_host: host,
        ui_host: "https://us.posthog.com",
        person_profiles: "always",
        capture_pageview: false, 
        capture_pageleave: true,
        autocapture: true,
        loaded: (ph) => {
          ph.capture("$pageview", { $current_url: window.location.href });
          if (process.env.NODE_ENV === "development") ph.debug();
        },
      }));
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
