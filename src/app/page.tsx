import Link from "next/link";

import { LatestPost } from "~/app/_components/post";
import { getServerAuthSession } from "~/server/auth";
import { api, HydrateClient } from "~/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // console.log(hello);
  // const session = await getServerAuthSession();

  const posts = await api.post.getAllBlogs();
  console.log(posts);
  

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] py-12 text-white">
        <div className="container px-4 mx-auto">
          <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> Blog
          </h1>

          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link key={post.id} href={`/post/${post.id}`}>
                <div className="rounded-xl bg-white/10 hover:bg-white/50 p-6">
                  <h3 className="mb-4 text-2xl font-bold">{post.title}</h3>
                  <div className="mb-4 text-lg">{post.description}</div>
                  <span className="text-base text-gray-400">
                    {post.createdAt.toLocaleString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link className="rounded-md bg-orange-500 px-6 py-2 font-medium" href={"/postBlog"}>
              投稿する
            </Link>
          </div>

          {/* {session?.user && <LatestPost />} */}
        </div>
      </main>
    </HydrateClient>
  );
}
