import Link from "next/link";
import { notFound } from "next/navigation";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getPost(id: string): Promise<Post | null> {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto p-6 font-sans">
      <Link
        href="/"
        className="inline-block mb-6 text-blue-600 hover:underline"
      >
        ← Back to Home
      </Link>
      <article className="p-6 border rounded-lg bg-white shadow-sm">
        <span className="text-sm font-semibold text-gray-400">
          Post #{post.id}
        </span>
        <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-4 capitalize">
          {post.title}
        </h1>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {post.body}
        </p>
      </article>
    </main>
  );
}
