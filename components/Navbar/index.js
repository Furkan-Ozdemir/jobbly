import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session, status } = useSession();

  async function logoutHandler() {
    try {
      const loadingToast = toast.loading("Logging out...");
      const response = await signOut();
      console.log(response);
      toast.dismiss(loadingToast);
      toast.success("Logged out successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong! Try again later");
    }
  }

  return (
    <nav className={styles.nav}>
      <Link href="/">Jobbly</Link>
      <div className={styles.internships}>
        <Link href="/internships">Internships</Link>
      </div>
      {!session && status !== "loading" && (
        <div className={styles.login}>
          <Link href="/auth?action=signup">Sign Up</Link>
          <Link href="/auth?action=login">Login</Link>
        </div>
      )}
      {session && (
        <div className={styles.login}>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      )}
    </nav>
  );
}
