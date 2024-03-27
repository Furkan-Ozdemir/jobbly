import React from "react";

export default function jobid({ job }) {
  if (!job) return <div style={{ fontSize: "2rem" }}>loading...</div>;
  return <div style={{ fontSize: "2rem" }}>{job.role}</div>;
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
  console.log("running2");
  const data = await getData();
  const job = data.find((job) => job.id === jobId);
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
