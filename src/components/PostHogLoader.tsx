"use client";

import dynamic from "next/dynamic";

// The provider wraps the whole app tree, so it must stay server-renderable.
// With `ssr: false` every page shipped an empty shell (Next emits a
// BAILOUT_TO_CLIENT_SIDE_RENDERING template), which cost us crawlable HTML and
// broke in-page anchors like /#contact because the target did not exist yet.
// Without the flag the provider still loads in its own chunk, but the page HTML
// is rendered on the server.
const PostHogProvider = dynamic(() => import("@/components/PostHogProvider"));

export default function PostHogLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PostHogProvider>{children}</PostHogProvider>;
}
