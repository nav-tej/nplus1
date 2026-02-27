"use client";

import dynamic from "next/dynamic";

const PostHogProvider = dynamic(
  () => import("@/components/PostHogProvider"),
  { ssr: false }
);

export default function PostHogLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PostHogProvider>{children}</PostHogProvider>;
}
