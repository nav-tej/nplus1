import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "n+α Ventures",
    short_name: "n+α",
    description: "Go-to-market consulting for B2B companies",
    start_url: "/",
    display: "browser",
    background_color: "#0B1221",
    theme_color: "#2ECC71",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
