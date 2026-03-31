export interface Video {
  slug: string;
  videoId: string;
  title: string;
  description: string;
  uploadDate: string;
  thumbnailUrl: string;
  duration?: string; // ISO 8601 duration format (e.g., PT1M33S)
  articleUrl: string;
  articleTitle: string;
}

export const VIDEOS: Record<string, Video> = {
  "scaling-heygen-gtm": {
    slug: "scaling-heygen-gtm",
    videoId: "ogk5uMVFJh0",
    title: "How I Scaled B2B SaaS from $20M to $100M+ ARR",
    description: "Inside the HeyGen GTM engine: Rebranding, SEO, and community building at scale with Nav Singh.",
    uploadDate: "2026-03-17T08:00:00Z",
    thumbnailUrl: "https://img.youtube.com/vi/ogk5uMVFJh0/maxresdefault.jpg",
    articleUrl: "/case-studies/heygen",
    articleTitle: "HeyGen Case Study",
  },
  "gtm-playbook-obsolete": {
    slug: "gtm-playbook-obsolete",
    videoId: "N-ys9Gjmy8A",
    title: "Your GTM Playbook Is Already Obsolete",
    description: "Why traditional GTM playbooks are failing in the AI era and how to architect for 2026.",
    uploadDate: "2026-03-17T08:00:00Z",
    thumbnailUrl: "https://img.youtube.com/vi/N-ys9Gjmy8A/maxresdefault.jpg",
    articleUrl: "/blog",
    articleTitle: "GTM & Growth Blog",
  },
};
