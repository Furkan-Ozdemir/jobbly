import Image from "next/image";
import styles from "@/styles/index.module.css";
import Tag from "@/components/Tag";

const TAGS = [
  "Marketing",
  "Engineering",
  "Design",
  "Product",
  "Sales",
  "Finance",
  "Operations",
  "Customer Support",
  "Data",
  "Legal",
  "HR",
  "IT",
  "Admin",
  "Other",
];

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
      <section className={styles.jobsTags}>
        <div className={styles.tags}>
          <span>Popular Search:</span>
          {TAGS.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </section>
      <section className={styles.jobsFiltering}>
        <div className={styles.filter}>Job title or keyword</div>
        <input type="text" placeholder="Designer" />
        <input type="text" placeholder="Level" />
        <input type="text" placeholder="Location" />
        <input type="text" placeholder="Job Types" />
      </section>
    </>
  );
}
