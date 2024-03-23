import Image from "next/image";
import styles from "@/styles/index.module.css";

export default function Home() {
  return (
    <>
      <section className={styles.section}>
        <header>
          <h1>find your next exciting internship</h1>
        </header>
        <Image
          src="/images/read.png"
          alt="Student looking for an internship"
          width={500}
          height={500}
        />
      </section>
    </>
  );
}
