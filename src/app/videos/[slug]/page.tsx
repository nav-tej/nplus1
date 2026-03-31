import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VideoEmbed from "@/components/VideoEmbed";
import JsonLd from "@/components/JsonLd";
import { VIDEOS } from "@/lib/videos";
import { ArrowLeft, Play, Clock, Share2 } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(VIDEOS).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const video = VIDEOS[slug];

  if (!video) return {};

  return {
    title: `${video.title} | Watch | n+α Ventures`,
    description: video.description,
    alternates: { canonical: `https://nplusalpha.com/videos/${slug}` },
    openGraph: {
      title: video.title,
      description: video.description,
      url: `https://nplusalpha.com/videos/${slug}`,
      type: "video.other",
      images: [{ url: video.thumbnailUrl }],
    },
    twitter: {
      card: "player",
      title: video.title,
      description: video.description,
      images: [video.thumbnailUrl],
    },
  };
}

export default async function VideoWatchPage({ params }: Props) {
  const { slug } = await params;
  const video = VIDEOS[slug];

  if (!video) {
    notFound();
  }

  return (
    <>
      <JsonLd 
        type="WebPage"
        title={video.title}
        description={video.description}
        path={`/videos/${slug}`}
        video={{
          name: video.title,
          description: video.description,
          thumbnailUrl: video.thumbnailUrl,
          uploadDate: video.uploadDate,
          contentUrl: `https://www.youtube.com/watch?v=${video.videoId}`,
          embedUrl: `https://www.youtube-nocookie.com/embed/${video.videoId}`,
        }}
      />
      <Navbar />
      <main id="main-content" className="bg-[#05080F] min-h-screen pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <Link 
            href={video.articleUrl}
            className="inline-flex items-center gap-2 text-muted hover:text-orange-400 transition-colors mb-8 text-sm group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to {video.articleTitle}
          </Link>

          <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">
            {/* Main Player Area */}
            <div className="space-y-8">
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                <VideoEmbed 
                  videoId={video.videoId} 
                  title={video.title} 
                />
              </div>

              <div className="space-y-6">
                <h1 className="text-3xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                  {video.title}
                </h1>
                
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Uploaded {new Date(video.uploadDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4 text-orange-400" />
                    <span>Featured Insight</span>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                  <h2 className="text-lg font-bold text-white mb-4">About this video</h2>
                  <p className="text-muted leading-relaxed text-lg">
                    {video.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Sidebar / CTA Area */}
            <aside className="space-y-6">
              <div className="p-8 rounded-3xl bg-orange-400/10 border border-orange-400/20 text-center">
                <h3 className="text-lg font-bold text-orange-400 mb-2">Want to build this?</h3>
                <p className="text-sm text-muted mb-6">Learn how we architect these GTM engines for B2B SaaS teams.</p>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center w-full rounded-xl bg-accent px-6 py-3 text-sm font-bold text-[#0B1221] hover:shadow-[0_0_20px_rgba(46,204,113,0.3)] transition-all"
                >
                  Book a Strategy Call
                </Link>
              </div>

              <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10">
                <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-widest">Full Context</h3>
                <p className="text-xs text-muted mb-4 leading-relaxed">
                  This video is a component of our detailed {video.articleTitle}. Read the full playbook to see the complete architecture.
                </p>
                <Link
                  href={video.articleUrl}
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-400 hover:underline group"
                >
                  Read Full Article
                  <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
