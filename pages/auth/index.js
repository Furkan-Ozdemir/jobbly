import React, { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
import toast from "react-hot-toast";
import AnimatedLink from "@/components/AnimatedLink/AnimatedLink";
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
    event.preventDefault();
    setDisabled(true);
    if (action === "login") {
      // log user in
      try {
        const loadingToast = toast.loading("Logging in...");
        const result = await signIn("credentials", {
          redirect: false,
          email,
          password,
          name,
        });
        toast.dismiss(loadingToast);
        toast.success("Logged in successfully!");
      } catch (err) {
        console.error(err);
      } finally {
        router.push("/");
        setDisabled(false);
      }
    }
    if (action === "signup") {
      try {
        await createUser(email, password, name);
      } catch (err) {
        console.error(err);
      } finally {
        router.push("/auth?action=login");
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
                  <AnimatedLink
                    href="/auth?action=signup"
                    className={styles.link}
                  >
                    Signup Here!
                  </AnimatedLink>
                </>
              ) : (
                <>
                  Have an Account?{" "}
                  <AnimatedLink
                    href="/auth?action=login"
                    className={styles.link}
                  >
                    Login Here!
                  </AnimatedLink>
                </>
              )}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
