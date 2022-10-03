import Link from "next/link";
import Image from "next/image";
import { trpc } from "../../utils/trpc";

function PostLists() {
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);
  const src = `https://res.cloudinary.com/arpit7xx/image/upload/v1664779648/qgpwhfagzf6yhaeqjevw.jpg`;

  if (isLoading) {
    return <p>loading posts...</p>;
  }

  if (!data?.length) {
    return <p>there are no posts yet.</p>;
  }

  return (
    <>
      <h1 className="text-center font-bold text-blue-500 py-5">All Posts</h1>
      {data?.map((post) => (
        <article key={post.id} className="bg-white flex border max-w-xl mx-auto flex-col md:flex-row justify-between mb-10">
          <Image
            loader={() => src}
            src={src}
            width={100}
            height={100}
            alt="image"
          />
          <p className="mx-5 flex items-center">{post.title}</p>
          <div className="mr-5 text-amber-900 flex items-center">
          <Link href={`/posts/${post.id}`}>Read Post</Link>
          </div>
          </article>
      ))}
    </>
  );
}

export default PostLists;
