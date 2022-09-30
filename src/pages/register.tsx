import Link from "next/link";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";

function RegisterPage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const { mutate, error } = trpc.useMutation(["users.register"], {
    onError: () => {
    },
    onSuccess: () => {
      router.push('/login');
    },
  });

  function onFinish(values: CreateUserInput) {
    mutate(values);
  }

  return (
    <>
        <h1>Register Page</h1>
      <form onSubmit={handleSubmit(onFinish)}>
        <input type="email" placeholder="a@b.com" {...register("email")} />
        <br />
        <input type="text" placeholder="arpit" {...register("name")} />
        <button type="submit">Register</button>
        {error && error.message}
      </form>

      <Link href="/login">Login</Link>
    </>
  );
}

export default RegisterPage;
