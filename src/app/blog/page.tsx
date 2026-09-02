import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Journal | Masters Barber Lounge",
  description:
    "Notes on grooming, style, and the craft, from the chairs at Masters Barber Lounge.",
};

export default function BlogPage() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-4xl px-6 pb-4 pt-16 text-center sm:px-10">
        <span className="text-xs uppercase tracking-[0.4em] text-gold-soft">
          The Journal
        </span>
        <h1 className="mt-6 text-balance font-serif text-4xl italic text-foreground sm:text-5xl">
          Notes From the Chair
        </h1>
      </div>

      <div className="mx-auto max-w-3xl divide-y divide-hairline border-y border-hairline px-6 py-16 sm:px-10">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-8 first:pt-0 last:pb-0"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-muted">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <h2 className="mt-3 font-serif text-2xl italic text-foreground transition-colors group-hover:text-gold-soft sm:text-3xl">
              {post.title}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{post.excerpt}</p>
            <span className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-gold">
              Read More &rarr;
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
