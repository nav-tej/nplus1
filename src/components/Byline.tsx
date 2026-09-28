import Image from "next/image";
import Link from "next/link";

function formatDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/**
 * Named author block for posts and case studies: portrait, name, credential,
 * dates. A visible, named author backs up the Person `author` in the JSON-LD.
 */
export default function Byline({
  published,
  updated,
  readTime,
  credential = "Former a16z Partner · Head of RevOps at HeyGen and Semgrep",
}: {
  published?: string;
  updated?: string;
  readTime?: number;
  credential?: string;
}) {
  const showUpdated = updated && updated !== published;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div className="flex items-center gap-3 min-w-0">
        <Image
          src="/nav-singh.jpg"
          alt="Nav Singh"
          width={44}
          height={44}
          className="w-11 h-11 rounded-full object-cover grayscale ring-1 ring-white/10 flex-shrink-0"
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">
            <Link href="/about" rel="author" className="hover:text-accent transition-colors">
              Nav Singh
            </Link>
          </p>
          <p className="text-xs text-muted">{credential}</p>
        </div>
      </div>
      <p className="text-xs text-muted sm:ml-auto">
        {published && <time dateTime={published}>{formatDate(published)}</time>}
        {showUpdated && (
          <>
            {published && " · "}Updated <time dateTime={updated}>{formatDate(updated!)}</time>
          </>
        )}
        {readTime ? ` · ${readTime} min read` : null}
      </p>
    </div>
  );
}
