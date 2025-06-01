import PostList from "@/components/PostList";
import { getPostsFromDB } from "@/lib/posts";

export default async function Home() {
  const posts = await getPostsFromDB();

  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '32px 0 24px 0' }}>블로그 글 목록</h1>
      <PostList posts={posts} />
    </div>
  );
}