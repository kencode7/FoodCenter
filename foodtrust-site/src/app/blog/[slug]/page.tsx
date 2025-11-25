import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPostBySlug } from "@/lib/appwrite";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const res = await getPostBySlug(params.slug);
  if (!res.ok) {
    return (
      <section className="container mx-auto px-4 py-16">
        <p className="text-muted-foreground">Post not found.</p>
      </section>
    );
  }
  const post: any = res.post;
  return (
    <section className="container mx-auto px-4 py-16 prose dark:prose-invert">
      <h1>{post.title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content ?? ""}</ReactMarkdown>
    </section>
  );
}