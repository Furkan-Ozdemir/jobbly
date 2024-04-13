import Image from "next/image";
import styles from "@/styles/index.module.css";
import Tag from "@/components/Tag";
import gsap from "gsap"; // <-- import GSAP
import { useGSAP } from "@gsap/react"; // <-- import the hook from our React package
import { useEffect, useRef } from "react";
import { TextPlugin } from "gsap/dist/TextPlugin";
import Link from "next/link";
import useSWRInfinite from "swr/infinite";
import Jobs from "@/components/Jobs/Jobs";

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

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, size, setSize, isLoading } = useSWRInfinite(
    (index) => `/api/jobs/?page=${index + 1}&limit=${10}`,
    fetcher
  );
  const jobs = data ? [].concat(...data) : [];
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10);

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
      <button
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore
          ? "loading..."
          : isReachingEnd
          ? "no more issues"
          : "load more"}
      </button>
      <section className={styles.jobs}>
        <Jobs
          data={jobs}
          loading={isLoadingMore}
          isEmpty={isEmpty}
          isReachingEnd={isReachingEnd}
        />
      </section>
    </>
  );
}

// export async function getStaticProps() {
//   const limit = 10;
//   let jobData;
//   try {
//     const client = await connectToDatabase();
//     const jobsCollection = client.db().collection("jobs");
//     const posts = await jobsCollection
//       .find({})
//       .skip(0)
//       .limit(parseInt(limit))
//       .toArray();
//     client.close();

//     jobData = posts.map((post) => {
//       return {
//         id: post._id.toString(),
//         company: post.company,
//         role: post.role,
//         datePosted: formatDateDifference(post.datePosted, new Date()),
//         skills: post.skills,
//       };
//     });
//   } catch (error) {
//     console.log(error);
//   } finally {
//     return {
//       props: {
//         jobData,
//       },
//     };
//   }
// }
