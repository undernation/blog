import Link from "next/link";
import { Post } from "@/lib/posts";
import styles from "./PostList.module.css";

// 컴포넌트가 받을 속성 타입 정의

type PostListProps = {
  posts: Post[];
};

// PostList 가 컴포넌트 이름, props로 posts 속성을 받음
export default function PostList({ posts }: PostListProps) {
  return (
    <div className={styles.listWrap}>
      {posts.map((post) => (
        <div key={post._id?.toString()} className={styles.card}>
          <Link href={`/post/${post._id?.toString()}`} className={styles.title}>
            {post.title}
          </Link>
          <div className={styles.date}>{post.date}</div>
          {/* <div className={styles.content}>{post.content}</div> */}
        </div>
      ))}
    </div>
  );
}
