"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className={styles.navbar}>
      <div className={styles.left}>
        <Link href="/" className={styles.link}>글 목록</Link>
        <Link href="/new" className={styles.link}>새 글 작성</Link>
      </div>
      {session && (
        <div className={styles.right}>
          <button onClick={() => signOut()} className={styles.logoutBtn}>
            로그아웃
          </button>
        </div>
      )}
    </nav>
  );
}
