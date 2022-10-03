import Link from "next/link";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { CreateUserInput } from "../schema/user.schema";

function RegisterPage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const { mutate, error } = trpc.useMutation(["users.register"], {
    onError: () => {},
    onSuccess: () => {
      router.push("/login");
    },
  });

  function onFinish(values: CreateUserInput) {
    mutate(values);
  }

  return (
    <>
      <h1 className="text-center text-xl py-5">Register Page</h1>
      <form className="form" onSubmit={handleSubmit(onFinish)}>
        <div>
          <label className="">Email: </label>
          <input
            type="email"
            placeholder="a@b.com"
            {...register("email")}
            className="input mb-5 ml-2"
          />
        </div>
        <br />
        <div>
          <label className="">Name: </label>
          <input
            type="text"
            placeholder="arpit"
            {...register("name")}
            className="input ml-2"
          />
        </div>
        {error && <p className="text-red-600 mb-2">{error.message}</p>}
        <button type="submit" className="btn mt-5 ml-5">
          Register
        </button>
        <p>
          Already have an account?
          <span className="text-blue-800">
            <Link href="/login"> Login</Link>
          </span>
        </p>
      </form>
    </>
  );
}

export default RegisterPage;
