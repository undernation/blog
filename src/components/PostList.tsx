import Link from "next/link";
import { Post } from "@/lib/posts";
import styles from "./PostList.module.css";

type PostListProps = {
  posts: Post[];
};

export default function PostList({ posts }: PostListProps) {
  return (
    <div className={styles.listWrap}>
      {posts.map((post) => (
        <div key={post._id?.toString()} className={styles.card}>
          <Link href={`/post/${post._id?.toString()}`} className={styles.title}>
            {post.title}
          </Link>
          <div className={styles.date}>{post.date}</div>
          <div className={styles.content}>{post.content}</div>
        </div>
      ))}
    </div>
  );
}
