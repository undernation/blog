"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import styles from "./PageClient.module.css";
import { useMemo } from "react";
import { ReactNode } from "react";

type PageClientProps = {
  post: { _id:string; title:string; content:string; date:string; author:string };
};

function preprocessMarkdown(content: string) {
  // \n이 2번 이상 반복되는 부분을 &nbsp;로 치환
  return content.replace(/\n{2,}/g, match => '\n' + '&nbsp;\n'.repeat(match.length - 1));
}

// 마크다운에서 헤딩 추출
function extractHeadings(markdown: string) {
  const lines = markdown.split("\n");
  const headings: { text: string; level: number; id: string }[] = [];
  lines.forEach(line => {
    const match = line.match(/^(#{1,3})\s+(.*)/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      // id는 텍스트를 kebab-case로 변환
      const id = text.toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-');
      headings.push({ text, level, id });
    }
  });
  return headings;
}

export default function PageClient({ post }: PageClientProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const isAuthor = session?.user?.email === post.author;

  // 목차 데이터 생성
  const headings = useMemo(() => extractHeadings(post.content), [post.content]);

  // 스크롤 이동 함수
  const handleTocClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const targetY = rect.top + scrollTop - 90; // 30px 오프셋  
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  // 마크다운 헤딩에 id 부여
  const renderers = {
    h1: (p: { children?: ReactNode }) => {
      const text = String(p.children);
      const id = text.toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-');
      return <h1 id={id} style={{fontSize:"2rem",fontWeight:700,margin:"32px 0 18px"}}>{p.children}</h1>;
    },
    h2: (p: { children?: ReactNode }) => {
      const text = String(p.children);
      const id = text.toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-');
      return <h2 id={id} style={{fontSize:"1.4rem",fontWeight:700,margin:"28px 0 14px"}}>{p.children}</h2>;
    },
    h3: (p: { children?: ReactNode }) => {
      const text = String(p.children);
      const id = text.toLowerCase().replace(/[^a-z0-9가-힣\s]/g, '').replace(/\s+/g, '-');
      return <h3 id={id} style={{fontSize:"1.15rem",fontWeight:700,margin:"22px 0 10px"}}>{p.children}</h3>;
    },
    p : (p: { children?: ReactNode }) => <p style={{ margin:"1em 0", whiteSpace:"pre-wrap" }}>{p.children}</p>,
    br: () => <br/>,
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        position: "relative",
      }}
    >
      <div
        style={{
          width: 700,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 8px rgba(0,0,0,.07)",
          padding: 32,
          border: "1px solid #ececec",
          zIndex: 1,
        }}
      >
        <h1 style={{ fontSize: "1.7rem", fontWeight: 700, marginBottom: 12 }}>{post.title}</h1>
        <div style={{ color: "#888", fontSize: "0.95rem", marginBottom: 18 }}>{post.date}</div>

        {isAuthor && (
          <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <button className={`${styles.button} ${styles.deleteBtn}`} onClick={async () => {
              if (!window.confirm("정말 삭제하시겠습니까?")) return;
              const ok = (await fetch(`/api/posts/${post._id}`, { method: "DELETE" })).ok;
              alert(ok ? "삭제되었습니다." : "삭제 실패");
              if (ok) router.push("/");
            }}>삭제</button>
            <button className={`${styles.button} ${styles.editBtn}`} onClick={() => router.push(`/edit/${post._id}`)}>수정</button>
          </div>
        )}

        {/* 🔥 마크다운 렌더링 */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={renderers}
        >
          {preprocessMarkdown(post.content)}
        </ReactMarkdown>
      </div>
      {/* TOC를 카드 오른쪽에 고정 */}
      {headings.length > 0 && (
        <nav
          className={styles.tocWrap}
          style={{
            position: "fixed",
            right: "180px", // 화면 오른쪽에서 80px 떨어짐
            top: "120px",  // 네비게이션바 아래에서 120px 떨어짐
            zIndex: 10,
          }}
        >
          <div className={styles.tocTitle}>목차</div>
          <ul className={styles.tocList}>
            {headings.map(h => (
              <li
                key={h.id}
                className={
                  styles.tocItem +
                  (h.level === 2 ? ' ' + styles.tocItemH2 : '') +
                  (h.level === 3 ? ' ' + styles.tocItemH3 : '')
                }
                onClick={() => handleTocClick(h.id)}
              >
                {h.text}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
