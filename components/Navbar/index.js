import React from "react";
import styles from "./style.module.css";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import toast from "react-hot-toast";
import AnimatedLink from "../AnimatedLink/AnimatedLink";

export default function Navbar() {
  const { data: session, status } = useSession();

  async function logoutHandler() {
    try {
      const loadingToast = toast.loading("Logging out...");
      const response = await signOut();
      toast.dismiss(loadingToast);
      toast.success("Logged out successfully!");
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong! Try again later");
    }
  }

  return (
    <nav className={styles.nav}>
      <AnimatedLink href="/">Jobbly</AnimatedLink>
      <div className={styles.internships}>
        <AnimatedLink href="/internships">Internships</AnimatedLink>
      </div>
      {!session && status !== "loading" && (
        <div className={styles.login}>
          <AnimatedLink href="/auth?action=signup">Sign Up</AnimatedLink>
          <AnimatedLink href="/auth?action=login">Login</AnimatedLink>
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
