import Link from "next/link";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Fetch error");
  const posts: Post[] = await res.json();
  return posts.slice(0, 5);
}

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="max-w-2xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-3">
        Simple Blog
      </h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <article
            key={post.id}
            className="p-5 border rounded-lg shadow-sm hover:shadow-md transition bg-white"
          >
            <h2 className="text-xl font-semibold mb-2">
              <Link
                href={`/posts/${post.id}`}
                className="text-blue-600 hover:underline capitalize"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-600 line-clamp-2">{post.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
