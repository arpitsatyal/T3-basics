import Error from "next/error";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

function SinglePostPage() {
  const router = useRouter();
  const postId = router.query.id as string;

  const { data, isLoading } = trpc.useQuery(["posts.single-post", { postId }]);

  if (isLoading) {
    return <p>loading posts...</p>;
  }

  if (!data) {
    return <Error statusCode={404} />;
  }

  return (
    <div className="flex h-screen justify-center items-center bg-slate-100">
      <div className="max-w-2xl mx-auto flex flex-col space-y-5 bg-white">
        <h1 className="font-bold text-xl text-center text-blue-600 px-2">
          {data.title}
        </h1>
        <p className="text-center p-5">{data.body}</p>
      </div>
    </div>
  );
}

export default SinglePostPage;
