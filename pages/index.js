import Image from "next/image";
import styles from "@/styles/index.module.css";
import Tag from "@/components/Tag";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { TextPlugin } from "gsap/dist/TextPlugin";
import useSWRInfinite from "swr/infinite";
import Jobs from "@/components/Jobs/Jobs";
import { connectToDatabase } from "@/db/db";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

gsap.registerPlugin(useGSAP, TextPlugin);
const TAGS = [
  "Next.js",
  "React",
  "Javascript",
  "CSS",
  "HTML",
  "GSAP",
  "React-Native",
  "OOP",
  "webpack",
  "SCSS",
];

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home({ jobData }) {
  const { data, size, setSize, isLoading, error } = useSWRInfinite(
    (index) => `/api/jobs/?page=${index + 1}&limit=${10}`,
    fetcher,
    { fallbackData: [jobData], revalidateOnFocus: false }
  );
  const [title, setTitle] = useState("");

  const router = useRouter();
  const { data: session } = useSession();
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
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        {/* <div className={styles.inputContainer}>
          <input type="text" placeholder="Level" />
        </div> */}
        {/* <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div> */}
        {/* <div className={styles.inputContainer}>
          <input type="text" placeholder="Job Types" />
        </div> */}
      </section>
      {session ? (
        <button
          disabled={isLoadingMore || isReachingEnd}
          onClick={() => setSize(size + 1)}
          className={styles.loadMore}
        >
          {isLoadingMore
            ? "Loading..."
            : isReachingEnd
            ? "No More Jobs Available"
            : "Load more"}
        </button>
      ) : (
        <button
          onClick={() => router.replace("/auth?action=signup")}
          className={styles.loadMore}
        >
          Login to view more
        </button>
      )}

      <section className={styles.jobs}>
        <Jobs
          data={jobs}
          loading={isLoadingMore}
          isEmpty={isEmpty}
          isReachingEnd={isReachingEnd}
          error={error}
          filter={title}
        />
      </section>
    </>
  );
}

export async function getStaticProps() {
  const limit = 10;
  let jobData;
  try {
    const client = await connectToDatabase();
    const jobsCollection = client.db().collection("jobs");
    const posts = await jobsCollection
      .find({})
      .skip(0)
      .limit(parseInt(limit))
      .toArray();
    client.close();

    jobData = posts.map((post) => {
      return {
        ...post,
        _id: post._id.toString(),
      };
    });
  } catch (error) {
    console.log(error);
  } finally {
    return {
      props: {
        jobData,
      },
    };
  }
}
