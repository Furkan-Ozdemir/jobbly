import React from "react";
import styles from "./style.module.css";
import Link from "next/link";

export default function index() {
  return (
    <nav className={styles.nav}>
      <Link href="/">Jobbly</Link>
      <div className={styles.internships}>
        <Link href="/internships">Internships</Link>
      </div>
      <div className={styles.login}>
        <Link href="/signup">Sign Up</Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}
