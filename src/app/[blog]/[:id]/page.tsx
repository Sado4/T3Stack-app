// import { useRouter } from "next/router";
// import { useRouter as useRouterPush } from "next/navigation";
import React from "react";
import { api } from "~/trpc/server";

const DetailBlog: React.FC<{ id: number }> = async (params) => {
  // const router = useRouter();
  // const routerPush = useRouterPush();
  // const router = useRouter();
  // const routerPush = useRouterPush();
  // const parseIntId = params.id ? Number(params.id) : NaN;

  const blog = await api.post.getDetailBlog({
    id: 1,
  });
  // const deleteBlog = api.example.deleteBlog.useMutation();

  const handleDelete = () => {
    // ユーザーに削除の確認を求めます
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        // ブログの削除を実行します
        // deleteBlog.mutate({ id: parseIntId });
        // 削除が成功したら、ホームページにリダイレクトします
        // routerPush.push("/");
      } catch (error) {
        // エラーハンドリング（例：エラーメッセージの表示）
        console.error("Failed to delete the blog", error);
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="mx-auto mt-10 w-full max-w-2xl rounded-md bg-white p-6 shadow-md">
        <h1 className="mb-4 text-3xl font-bold">{blog?.title}</h1>
        <div className="mb-8 text-sm text-gray-500">
          <span>{blog?.createdAt.toLocaleDateString()}</span>{" "}
          {/* Created Atが必要ならば、表示 */}
        </div>
        <p className="whitespace-pre-line text-gray-700">{blog?.description}</p>
        <button
          className="mt-4 rounded-md bg-red-500 px-4 py-2 text-white"
          // onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </main>
  );
};

export default DetailBlog;
