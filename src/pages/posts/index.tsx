import Link from "next/link";
import { trpc } from "../../utils/trpc";

function PostLists() {
  const { data, isLoading } = trpc.useQuery(["posts.posts"]);

  if (isLoading) {
    return <p>loading posts...</p>;
  }

  if (!data?.length) {
    return <p>there are no posts yet.</p>;
  }

  return (
    <div>
      {data?.map((post) => (
        <article key={post.id}>
          <p>{post.title}</p>
          <Link href={`/posts/${post.id}`}>Read Post</Link>
        </article>
      ))}
    </div>
  );
}

export default PostLists;
