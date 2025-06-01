import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.link}>글 목록</Link>
      <Link href="/new" className={styles.link}>새 글 작성</Link>
    </nav>
  );
}
