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
    <div className="flex flex-col space-y-5 vertical-center">
      <Link href="/posts">
        <p className="link">All Posts</p>
      </Link>
      <Link href="/posts/new">
        <p className="link">Create Post</p>
      </Link>
    </div>
  );
};

export default Home;
