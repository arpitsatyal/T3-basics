import Link from "next/link";
import Image from "next/image";
import { trpc } from "../../utils/trpc";

function PostLists() {
  const utils = trpc.useContext();
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);
  const src = `https://res.cloudinary.com/arpit7xx/image/upload/v1664779648/qgpwhfagzf6yhaeqjevw.jpg`;

  const { mutate } = trpc.useMutation(["posts.delete-post"], {
    onSuccess() {
      utils.invalidateQueries();
    },
  });

  if (isLoading) {
    return <p>loading posts...</p>;
  }

  if (!data?.length) {
    return <p>there are no posts yet.</p>;
  }

  function deletePost(id: string) {
    mutate({ postId: id });
  }

  return (
    <>
      <h1 className="text-center font-bold text-blue-500 py-5
       transition ease-in-out delay-150 hover:opacity-20 hover:rotate-45 hover:scale-125">
        All Posts
      </h1>
      {data?.map((post) => (
        <article
          key={post.id}
          className="bg-white flex border max-w-xl mx-auto flex-col md:flex-row mb-10"
        >
          <Image
            loader={() => src}
            src={src}
            width={100}
            height={100}
            alt="image"
          />
          <div className="break-all w-28 justify-center flex-1 flex items-center">
            {post.title}
          </div>
          <div className="mr-5 text-amber-900 flex items-center">
            <Link href={`/posts/${post.id}`}>Read</Link>
          </div>
          <div
            className="flex items-center mr-5 cursor-pointer"
            onClick={() => deletePost(post.id)}
          >
            delete
          </div>
        </article>
      ))}
    </>
  );
}

export default PostLists;
