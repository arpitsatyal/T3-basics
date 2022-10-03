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
    <div className="bg-slate-100 h-screen">
      <form onSubmit={handleSubmit(onFinish)}>
        <h1 className="text-center text-xl py-5">Login Page</h1>
        <div className="form">
          <label className="mb-5">Email</label>
          <input
            type="email"
            placeholder="a@b.com"
            {...register("email")}
            className="input"
          />
          <br />
         <div className="mb-2">
         {error && <p className="text-red-600">{error.message}</p>}
          {isLoading && <p className="text-yellow-900">loading...</p>}
          {success && <p className="text-green-600">check yer email</p>}
         </div>
          <button className="btn">Login</button>
          <p>
            Not registered yet?
            <span className="text-blue-800">
              <Link href="/register"> Sign up</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
