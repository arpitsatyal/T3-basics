import Link from "next/link";
import type { NextPage } from "next";
import LoginForm from "../components/LoginForm";
import { useUserContext } from "../context/user.context";

const Home: NextPage = () => {
  const user = useUserContext();
  if (!user) {
    return <LoginForm />;
  }
  return (
    <div>
      <Link href="/posts/new">
        <p>Create Post</p>
      </Link>
    </div>
  );
};

export default Home;
