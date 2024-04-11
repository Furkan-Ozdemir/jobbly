import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

export default function Auth() {
  return (
    <div style={{ textAlign: "center" }}>
      <div className={styles.form_area}>
        <form className={styles.form}>
          <div className={styles.form_group}>
            <label htmlFor="name" className={styles.sub_title}>
              Name
            </label>
            <input
              type="text"
              className={styles.form_style}
              id="name"
              placeholder="Enter your full name"
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="email" className={styles.sub_title}>
              Email
            </label>
            <input
              type="email"
              className={styles.form_style}
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className={styles.form_group}>
            <label htmlFor="password" className={styles.sub_title}>
              Password
            </label>
            <input
              type="password"
              className={styles.form_style}
              id="password"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          <div>
            <button className={styles.btn}>SIGN UP!</button>
            <p className={styles.p}>
              Have an Account?{" "}
              <Link href="/auth?action=login" className={styles.link}>
                Login Here!
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
