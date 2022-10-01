import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery([
    "users.verify-otp",
    {
      hash,
    },
  ]);
  if (isLoading) {
    return <p>Verifying...</p>;
  }
  router.push(data?.redirect.includes("login") ? "/" : data?.redirect || "/");

  return <p>redirecting...</p>;
}

function LoginForm() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false);

  const { mutate, error, isLoading } = trpc.useMutation(["users.request-otp"], {
    onError: () => {},
    onSuccess: () => {
      setSuccess(true);
    },
  });

  function onFinish(values: CreateUserInput) {
    mutate({ ...values, redirect: router.asPath });
  }

  const hash = router.asPath.split("#token=")[1];
  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onFinish)}>
        <h1>Login Page</h1>
        <input type="email" placeholder="a@b.com" {...register("email")} />
        <br />
        {error && error.message}
        {isLoading && <p>loading...</p>}
        {success && <p>check yer email</p>}

        <button>Login</button>
      </form>

      <Link href="/register">Register</Link>
    </>
  );
}

export default LoginForm;
