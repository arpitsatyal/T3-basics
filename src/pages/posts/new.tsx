import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { trpc } from "../../utils/trpc";
import { CreatePostInput } from "../../schema/post.schema";

function CreatePostPage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<CreatePostInput>();
  const { mutate, error, isLoading } = trpc.useMutation(["posts.create"], {
    onSuccess({ id }) {
      router.push(`posts/${id}`);
    },
  });

  function onSubmit(values: CreatePostInput) {
    mutate(values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && error.message}
      {isLoading && <p>creating...</p>}
      <h1>create post...</h1>
      <input type="text" placeholder="post title" {...register("title")} />
      <br />
      <textarea placeholder="post body" {...register("body")} />
      <br />
      <button>create post.</button>
    </form>
  );
}

export default CreatePostPage;
