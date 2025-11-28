export const dynamic = "force-dynamic";
export const revalidate = 0;

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listPosts } from "@/lib/appwrite";

export default async function BlogPage({ searchParams }: { searchParams?: Promise<{ page?: string | string[] }> | { page?: string | string[] } }) {
  const sp = typeof searchParams === "object" && searchParams !== null && "then" in (searchParams as any)
    ? await (searchParams as Promise<{ page?: string | string[] }>)
    : (searchParams as { page?: string | string[] } | undefined);
  const rawPage = sp?.page;
  const pageStr = Array.isArray(rawPage) ? rawPage[0] : rawPage;
  const page = Number(pageStr ?? "1") || 1;
  const pageSize = 5;
  const res = await listPosts({ page, pageSize });
  const posts = res.ok ? res.posts : [];
  const total = res.ok ? res.total : 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  function deriveExcerpt(p: any) {
    const raw = p.excerpt ?? p.content ?? "";
    const cleaned = String(raw).replace(/[#*_`>]/g, "").trim();
    return cleaned.length > 0 ? (cleaned.length > 140 ? cleaned.slice(0, 140) + "…" : cleaned) : "";
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mt-3 text-muted-foreground">Articles on supply chain transparency, compliance, and best practices.</p>
        <div className="mt-8 space-y-4">
          {posts.map((p: any) => (
            <Card key={p.slug}>
              <CardHeader>
                <CardTitle>
                  <Link href={`/blog/${String(p.slug).toLowerCase()}?id=${encodeURIComponent(String(p.$id || ""))}`}>{p.title}</Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{deriveExcerpt(p)}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-between">
          <Link href={`/blog?page=${Math.max(1, page - 1)}`} className="text-sm hover:text-primary">Prev</Link>
          <span className="text-sm text-muted-foreground">Page {page} of {totalPages}</span>
          <Link href={`/blog?page=${Math.min(totalPages, page + 1)}`} className="text-sm hover:text-primary">Next</Link>
        </div>
      </div>
    </section>
  );
}