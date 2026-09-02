import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Masters Barber Lounge`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="relative">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:px-10">
        <Link
          href="/blog"
          className="text-xs uppercase tracking-[0.3em] text-gold-soft hover:text-gold"
        >
          &larr; The Journal
        </Link>

        <span className="mt-8 block text-xs uppercase tracking-[0.3em] text-muted">
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
        <h1 className="mt-4 text-balance font-serif text-4xl italic text-foreground sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted">
          {post.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-16 border-t border-hairline pt-8">
          <Link
            href="/menu"
            className="text-sm uppercase tracking-[0.2em] text-gold-soft underline decoration-gold/40 underline-offset-4 hover:text-gold"
          >
            See the Full Menu
          </Link>
        </div>
      </div>
    </article>
  );
}
