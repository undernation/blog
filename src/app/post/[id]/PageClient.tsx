"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

type PageClientProps = {
  post: { _id:string; title:string; content:string; date:string; author:string };
};

function preprocessMarkdown(content: string) {
  // \n이 2번 이상 반복되는 부분을 &nbsp;로 치환
  return content.replace(/\n{2,}/g, match => '\n' + '&nbsp;\n'.repeat(match.length - 1));
}

export default function PageClient({ post }: PageClientProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const isAuthor = session?.user?.email === post.author;

  const handleDelete = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    const ok = (await fetch(`/api/posts/${post._id}`, { method:"DELETE" })).ok;
    alert(ok ? "삭제되었습니다." : "삭제 실패");
    if (ok) router.push("/");
  };

  return (
    <div style={{
      display:"flex", maxWidth:1100, margin:"40px auto",
      background:"#fff", borderRadius:16, boxShadow:"0 2px 8px rgba(0,0,0,.07)",
      padding:32, border:"1px solid #ececec"
    }}>
      <div style={{ flex:1, minWidth:0 }}>
        <h1 style={{ fontSize:"1.7rem", fontWeight:700, marginBottom:12 }}>{post.title}</h1>
        <div style={{ color:"#888", fontSize:"0.95rem", marginBottom:18 }}>{post.date}</div>

        {isAuthor && (
          <div style={{ display:"flex", gap:12, marginBottom:16 }}>
            <button className="deleteBtn" onClick={handleDelete}>삭제</button>
            <button className="editBtn" onClick={() => router.push(`/edit/${post._id}`)}>수정</button>
          </div>
        )}

        {/* 🔥 마크다운 렌더링 */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({...p}) => <h1 style={{fontSize:"2rem",fontWeight:700,margin:"32px 0 18px"}}>{p.children}</h1>,
            h2: ({...p}) => <h2 style={{fontSize:"1.4rem",fontWeight:700,margin:"28px 0 14px"}}>{p.children}</h2>,
            h3: ({...p}) => <h3 style={{fontSize:"1.15rem",fontWeight:700,margin:"22px 0 10px"}}>{p.children}</h3>,
            /* ② p에 pre-wrap + margin ==> 줄바꿈 / 문단 모두 OK */
            p : ({...p}) => <p style={{ margin:"1em 0", whiteSpace:"pre-wrap" }}>{p.children}</p>,
            br: () => <br/>,                   // 한 줄 엔터
          }}
        >
          {preprocessMarkdown(post.content)}
        </ReactMarkdown>
      </div>
    </div>
  );
}
