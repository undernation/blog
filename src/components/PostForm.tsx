"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./PostForm.module.css";
import { useSession } from "next-auth/react";

type PostFormProps = {
  postId?: string;
};

export default function PostForm({ postId }: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (postId) {
      (async () => {
        const res = await fetch(`/api/posts/${postId}`);
        if (res.ok) {
          const data = await res.json();
          setTitle(data.title);
          setContent(data.content);
        }
      })();
    }
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;
    if (!title || !content) return;

    setLoading(true);
    try {
      let res;
      if (postId) {
        res = await fetch(`/api/posts/${postId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content }),
        });
      } else {
        res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content, author: session.user?.email }),
        });
      }
      if (!res.ok) return;

      setTitle("");
      setContent("");
      router.push("/");
    } catch {
      return;
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") return <div>로딩 중...</div>;
  if (!session) return <div style={{ margin: 40, textAlign: "center" }}>로그인한 사용자만 글을 작성할 수 있습니다.</div>;

  return (
    <div className={styles.formWrap}>
      <form onSubmit={handleSubmit} className={styles.form}>
        {postId && <div className={styles.editId}>수정할 글 ID: {postId}</div>}
        <input
          className={styles.input}
          type="text"
          placeholder="제목"
          value={title ?? ""}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className={styles.textarea}
          placeholder="내용 (마크다운 지원)"
          value={content ?? ""}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? (postId ? "저장 중..." : "작성 중...") : postId ? "저장" : "글 작성"}
        </button>
      </form>
    </div>
  );
}