"use client";

import React from "react";

interface VideoEmbedProps {
  videoId: string;
  title: string;
  format?: "horizontal" | "vertical";
}

export default function VideoEmbed({
  videoId,
  title,
  format = "horizontal",
}: VideoEmbedProps) {
  const containerClass = format === "vertical" ? "video-9-16" : "video-16-9";

  return (
    <div className={`video-responsive-container ${containerClass}`}>
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
}
