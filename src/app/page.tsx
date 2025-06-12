import PostList from "@/components/PostList";
import { getPostsFromDB } from "@/lib/posts";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default async function Home() {
  const posts = await getPostsFromDB();

  return (
    <div style={{ display: "flex", maxWidth: 1200, margin: "0 auto" }}>
      {/* 왼쪽: 기존 글 목록 */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', margin: '32px 0 24px 0' }}>블로그 글 목록</h1>
        <PostList posts={posts} />
      </div>
      {/* 오른쪽: 전체글(목차) */}
      <aside style={{
        flex: "0 0 auto",
        marginLeft: 20,
        padding: 24,
        paddingRight: 24,
        background: "#fafbfc",
        borderRadius: 12,
        border: "1px solid #ececec",
        height: "fit-content",
        position: "sticky",
        top: 80,
        minWidth: 140,
        maxWidth: 180
      }}>
        <div style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 16 }}>전체글</div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {posts.map(post => (
            <li key={post._id?.toString()} style={{ marginBottom: 10 }}>
              <Link href={`/post/${post._id?.toString()}`} style={{ color: "#2563eb", textDecoration: "none" }}>
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}