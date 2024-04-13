import Image from "next/image";
import styles from "@/styles/index.module.css";
import Tag from "@/components/Tag";
import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package
import { useEffect, useRef } from "react";
import { TextPlugin } from "gsap/dist/TextPlugin";
import Link from "next/link";
import useSWRInfinite from "swr/infinite";
import { connectToDatabase } from "@/db/db";
import JobItem from "@/components/JobItem/JobItem";

gsap.registerPlugin(useGSAP, TextPlugin);
const TAGS = [
  "Marketing",
  "Engineering",
  "Design",
  "Product",
  "Sales",
  "Finance",
  "Operations",
  "Data",
  "Legal",
  "HR",
  "IT",
  "Admin",
  "Other",
];

export default function Home({ data }) {
  //TODO useSwr kullanarak load more butonu yapılabilir

  const ref = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 1, delay: 1.5 },
      repeat: -1,
      repeatDelay: 2,
    });

    tl.to(ref.current, {
      text: "Don't lose hope",
    })
      .to(ref.current, {
        text: "At least not until you've tried Jobbly",
      })
      .to(ref.current, {
        text: ref.current.textContent,
      });
  });
  return (
    <>
      <section className={styles.section}>
        <header>
          <h1 ref={ref}>find your next exciting internship</h1>
        </header>
        <Image
          src="/images/read.png"
          alt="Student looking for an internship"
          width={500}
          height={500}
          priority
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
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Designer" />
        </div>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Level" />
        </div>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Location" />
        </div>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Job Types" />
        </div>
      </section>
      <section className={styles.jobs}>
        <JobItem data={data} />
      </section>
    </>
  );
}

export async function getStaticProps() {
  const limit = 10;
  const client = await connectToDatabase();
  const jobsCollection = client.db().collection("jobs");
  let data;
  try {
    const posts = await jobsCollection
      .find({})
      .skip(0)
      .limit(parseInt(limit))
      .toArray();
    data = posts.map((post) => {
      return {
        id: post._id.toString(),
        company: post.company,
        role: post.role,
        datePosted: formatDateDifference(post.datePosted, new Date()),
        skills: post.skills,
      };
    });
  } catch (error) {
    console.log(error);
  } finally {
    client.close();
    return {
      props: {
        data,
      },
    };
  }
}
function formatDateDifference(date1, date2) {
  const diffInMs = new Date(date2) - new Date(date1);
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays < 7) {
    return `${diffInDays} days ago`;
  } else if (diffInDays < 14) {
    return "1 week ago";
  } else if (diffInDays < 30) {
    const weeks = Math.floor(diffInDays / 7);
    return `${weeks} weeks ago`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} months ago`;
  } else {
    const years = Math.floor(diffInDays / 365);
    return `${years} years ago`;
  }
}
