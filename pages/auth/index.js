import React, { useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

async function createUser(email, password, name) {
  const loadingToast = toast.loading("Signing up...", {
    style: { fontSize: "1.5rem" },
  });

  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    toast.dismiss(loadingToast);

    if (data.ok) {
      toast.success("User created!");
    } else {
      toast.error(data.message || "Cannot create user! Try again later");
    }
  } catch (err) {
    toast.dismiss(loadingToast);
    toast.error(err.message || "Something went wrong! Try again later");
  }
}

export default function Auth() {
  const router = useRouter();
  const { action } = router.query;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [disabled, setDisabled] = useState(false);

  async function submitHandler(event) {
    console.log("here");
    event.preventDefault();
    setDisabled(true);
    // optional: Add client-side validation
    if (action === "login") {
      // log user in
      try {
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
          name,
        });
        console.log(result);
      } catch (err) {
        console.error(err);
      } finally {
        setDisabled(false);
      }
    }
    if (action === "signup") {
      try {
        await createUser(email, password, name);
      } catch (err) {
        console.error(err);
      } finally {
        setDisabled(false);
      }
    }
  }
  return (
    <div style={{ textAlign: "center" }}>
      <div className={styles.form_area}>
        <form className={styles.form} onSubmit={submitHandler}>
          {action !== "login" && (
            <>
              <div className={styles.form_group}>
                <label htmlFor="name" className={styles.sub_title}>
                  Name
                </label>
                <input
                  type="text"
                  className={styles.form_style}
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </>
          )}
          <div className={styles.form_group}>
            <label htmlFor="email" className={styles.sub_title}>
              Email
            </label>
            <input
              type="email"
              className={styles.form_style}
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button className={styles.btn} disabled={disabled}>
              {action === "login" ? "LOG IN!" : "SIGN UP!"}
            </button>
            <p className={styles.p}>
              {action === "login" ? (
                <>
                  Don&apos;t Have an Account?{" "}
                  <Link href="/auth?action=signup" className={styles.link}>
                    Signup Here!
                  </Link>
                </>
              ) : (
                <>
                  Have an Account?{" "}
                  <Link href="/auth?action=login" className={styles.link}>
                    Login Here!
                  </Link>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
