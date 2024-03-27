import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
import Tag from "@/components/Tag";
export default function jobid({ job }) {
  if (!job) return <div style={{ fontSize: "2rem" }}>loading...</div>;
  return (
    <>
      <section className={styles.section}>
        <header>
          <p>{job.company}</p>
          <h1>{job.role}</h1>
        </header>
        <Image
          src="/images/inspecting.png"
          alt="a monitor with a documents on it"
          width={400}
          height={400}
        />
      </section>
      <section>
        <div className={styles.jobDetails}>
          <div>
            <p>Location</p>
            <p>{job.location}</p>
          </div>
          <div>
            <p>Job Type</p>
            <p>{job.job_type}</p>
          </div>
          <div>
            <p>Job Posted</p>
            <p>{job.datePosted}</p>
          </div>
          <div>
            <p>Applications Close</p>
            <p>{job.deadline}</p>
          </div>
        </div>
      </section>
      <section className={styles.jobsTags}>
        <div className={styles.tags}>
          <span>Perks:</span>
          {job.perks.split(",").map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </section>
      <main className={styles.jobExplanations}>
        <div>
          <p className={styles.about_the_role}>
            <h5>About the role</h5>
            {job.about_the_role}
          </p>
          <ul className={styles.skills}>
            <h5>Required Skills</h5>

            {job.required_skills.split(",").map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
async function getData() {
  const res = await fetch(
    "https://jobbly-e5e79-default-rtdb.firebaseio.com/jobs.json"
  );
  const data = await res.json();
  return data;
}

export async function getStaticProps(context) {
  // Burayi sonradan duzelt tum datayi cekmesin
  //belki graphql ile yaparsin
  const { params } = context;
  const jobId = params.jobId;
  const data = await getData();
  const job = data.find((job) => job.id === jobId);
  if (!job) return { notFound: true };

  return {
    props: {
      job,
    },
  };
}
export async function getStaticPaths() {
  const data = await getData();

  const turkishJobs = data.filter((job) => job.location === "Turkey");
  const turkishJobIds = turkishJobs.map((job) => job.id);
  const pathsWithParams = turkishJobIds.map((id) => ({
    params: { jobId: id },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}
