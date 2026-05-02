import latestPosts from "@generated/code-and-pasta-latest-posts/default/latest-posts";
import type { PostItem } from "./latestPostsSection.types";

export function useLatestPostsSection(): PostItem[] {
  return latestPosts;
}
