import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import { trpc } from "../../utils/trpc";
import { CreatePostInput } from "../../schema/post.schema";

function CreatePostPage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<CreatePostInput>();
  const { mutate, error, isLoading } = trpc.useMutation(["posts.create"], {
    onSuccess() {
      router.push(`/posts`);
    }
  });

  function onSubmit(values: CreatePostInput) {
    mutate(values);
  }

  return (
    <div className="bg-slate-100 h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-md mx-auto space-y-5"
      >
        <div className="py-2">
          {error && <p className="text-red-700">{error.message}</p>}
          {isLoading && <p className="text-amber-700">creating...</p>}
        </div>
        <h1 className="text-center text-xl py-5">create post page</h1>
        <input
          type="text"
          placeholder="post title"
          {...register("title")}
          className="input"
        />
        <textarea
          placeholder="post body"
          {...register("body")}
          className="placeholder:text-center focus:outline-none"
        />
        <button className="btn">create post.</button>
      </form>
    </div>
  );
}

export default CreatePostPage;
