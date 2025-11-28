export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { listPosts } from "@/lib/appwrite";

export default async function DebugAppwritePage() {
  const res = await listPosts({ page: 1, pageSize: 3 });
  const posts = res.ok ? res.posts : [];
  const total = res.ok ? res.total : 0;

  const endpointState = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ? "set" : "missing";
  const projectState = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ? "set" : "missing";
  const dbState = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ? "set" : "missing";
  const postsIdState = process.env.NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION_ID ? "set" : "missing";

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-2xl font-semibold">Appwrite Debug</h1>
        <div className="mt-4 space-y-1 text-sm text-muted-foreground">
          <p>Endpoint: {endpointState}</p>
          <p>Project ID: {projectState}</p>
          <p>Database ID: {dbState}</p>
          <p>Posts Table ID: {postsIdState}</p>
        </div>
        <div className="mt-6">
          <p className="text-sm">listPosts ok: {String(res.ok)}</p>
          <p className="text-sm">total: {String(total)}</p>
          <ul className="mt-3 space-y-2">
            {posts.map((p: any) => {
              const raw = p.content ?? p.body ?? p.markdown ?? p.text ?? p.richText ?? p.excerpt ?? "";
              const content = typeof raw === "string" ? raw : JSON.stringify(raw);
              const snippet = String(content).replace(/[#*_`>]/g, "").trim();
              const short = snippet.length > 0 ? (snippet.length > 140 ? snippet.slice(0, 140) + "…" : snippet) : "(no content)";
              return (
                <li key={p.slug ?? p.$id} className="text-sm">
                  <Link href={`/blog/${String(p.slug ?? "").toLowerCase()}?id=${encodeURIComponent(String(p.$id || ""))}`} className="hover:text-primary">
                    {p.title}
                  </Link>
                  <div className="text-xs text-muted-foreground">slug: {String(p.slug ?? "")} · id: {String(p.$id ?? "")}</div>
                  <div className="text-xs text-muted-foreground">content: {short}</div>
                </li>
              );
            })}
            {posts.length === 0 && (
              <li className="text-sm text-muted-foreground">No posts returned.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}