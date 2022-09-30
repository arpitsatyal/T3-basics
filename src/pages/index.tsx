import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, error, isLoading } = trpc.useQuery(["hello"]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{JSON.stringify(error)}</p>;
  }
  return <h1> {JSON.stringify(data)}</h1>;
};

export default Home;
