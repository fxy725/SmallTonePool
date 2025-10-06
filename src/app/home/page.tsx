import HomeClientPage from "@/components/home/HomeClientPage";
import { getAllPosts } from "@/lib/content/posts";

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 7);
  return <HomeClientPage initialPosts={posts} />;
}

