import { trpc } from "./trpc";

export function useFetchPosts() {
  return trpc.useQuery(["posts.posts"]);
}
