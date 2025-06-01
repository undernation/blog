"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // 로그인 성공 시 메인으로 이동
      router.replace("/");
    }
  }, [session, router]);

  if (status === "loading") return <div>로딩 중...</div>;

  if (session) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 80 }}>
        <div style={{ marginBottom: 24, fontWeight: 'bold' }}>{session.user?.email} 님 로그인됨</div>
        <button onClick={() => signOut()} style={{ padding: '12px 32px', borderRadius: 8, background: '#2563eb', color: '#fff', fontWeight: 'bold', border: 'none', fontSize: '1.1rem', cursor: 'pointer' }}>로그아웃</button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 120 }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 32 }}>관리자 로그인</h1>
      <button onClick={() => signIn("google")}
        style={{ padding: '16px 40px', borderRadius: 10, background: '#2563eb', color: '#fff', fontWeight: 'bold', border: 'none', fontSize: '1.2rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,99,235,0.08)' }}>
        구글 계정으로 로그인
      </button>
    </div>
  );
} 