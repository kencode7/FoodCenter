export const dynamic = "force-dynamic";
export const revalidate = 0;

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug, getPostById } from "@/lib/appwrite";
import { redirect } from "next/navigation";

export default async function BlogPostPage({ params, searchParams }: { params: Promise<{ slug: string }> | { slug: string }; searchParams?: Promise<{ id?: string }> | { id?: string } }) {
  const pr = typeof params === "object" && params !== null && "then" in (params as any)
    ? await (params as Promise<{ slug: string }>)
    : (params as { slug: string });
  const canonical = String(pr.slug || "").toLowerCase();
  if (pr.slug !== canonical) {
    redirect(`/blog/${canonical}`);
  }
  const res = await getPostBySlug(canonical);
  let post: any = res.ok ? res.post : null;
  const sp = typeof searchParams === "object" && searchParams !== null && "then" in (searchParams as any)
    ? await (searchParams as Promise<{ id?: string }>)
    : (searchParams as { id?: string } | undefined);
  if (!post && sp?.id) {
    const byId = await getPostById(sp.id);
    post = byId.ok ? byId.post : null;
  }
  if (!post) {
    return (
      <section className="container mx-auto px-4 py-16">
        <p className="text-muted-foreground">Post not found.</p>
      </section>
    );
  }
  return (
    <section className="container mx-auto px-4 py-16 prose dark:prose-invert">
      <h1>{post.title}</h1>
      {(() => {
        const raw = post.content ?? post.body ?? post.markdown ?? post.text ?? post.richText ?? post.excerpt ?? "";
        const content = typeof raw === "string" ? raw : "";
        return <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>;
      })()}
    </section>
  );
}