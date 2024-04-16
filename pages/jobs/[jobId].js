import Image from "next/image";
import React from "react";
import styles from "./styles.module.css";
import Tag from "@/components/Tag";
import Loader from "@/components/Loader";
import Head from "next/head";
import { connectToDatabase } from "@/db/db";
import { ObjectId } from "mongodb";

export default function jobid({ job }) {
  if (!job) return <Loader />;
  return (
    <>
      <Head>
        <title>{job.role + " at " + job.company}</title>
        <meta
          name="description"
          content={`Jobbly is an internship/new grad role finder app. ${job.role} at ${job.company}`}
        />
      </Head>
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
          className={styles.image}
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
      <section className={styles.jobExplanations}>
        <div>
          <div className={styles.about_the_role}>
            <div>
              <em>
                <b> About the role:</b>
              </em>
            </div>
            {job.about_the_role}
          </div>
          <ul className={styles.skills}>
            <p>
              <em>
                <b>Required Skills</b>
              </em>
            </p>

            {job.required_skills.split(",").map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
async function getJob(jobId) {
  const convertedId = new ObjectId(jobId);
  try {
    const client = await connectToDatabase();
    const job = await client
      .db()
      .collection("jobs")
      .findOne({ _id: convertedId });
    return job;
  } catch (err) {
    console.log(err);
    return {};
  }
}

export async function getStaticProps(context) {
  const { params } = context;
  const jobId = params.jobId;
  try {
    const returnedJob = await getJob(jobId);
    const job = JSON.parse(JSON.stringify(returnedJob));
    if (!returnedJob) return { props: {} };
    return {
      props: {
        job,
      },
      revalidate: 1,
    };
  } catch (err) {
    throw new Error("Failed to fetch job data");
  }
}
export async function getStaticPaths() {
  return {
    paths: [
      { params: { jobId: "661a661d60aff90975a694cb" } },
      { params: { jobId: "661a661d60aff90975a694cc" } },
      { params: { jobId: "661a661d60aff90975a694cd" } },
      { params: { jobId: "661a661d60aff90975a694ce" } },
      { params: { jobId: "661a661d60aff90975a694cf" } },
      { params: { jobId: "661a661d60aff90975a694d0" } },
      { params: { jobId: "661a661d60aff90975a694d1" } },
      { params: { jobId: "661a661d60aff90975a694d2" } },
      { params: { jobId: "661a661d60aff90975a694d3" } },
      { params: { jobId: "661a661d60aff90975a694d4" } },
    ],
    fallback: true,
  };
}
