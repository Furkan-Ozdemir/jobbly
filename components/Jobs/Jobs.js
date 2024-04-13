import React from "react";
import Link from "next/link";
import Tag from "../Tag";
import { formatDateDifference } from "@/utils/formatDate";
import styles from "./style.module.css";
export default function JobItem({
  data,
  loading,
  isEmpty,
  isReachingEnd,
  error,
}) {
  // if (loading)
  //   return (
  //     <ul className={styles.loaderContainer}>
  //       <div className={styles.loader}></div>
  //     </ul>
  // );
  data = data?.map((job) => {
    return {
      ...job,
      datePosted: formatDateDifference(job.datePosted, new Date()),
    };
  });
  if (isEmpty)
    return (
      <ul>
        <h2>No jobs found</h2>
      </ul>
    );
  else if (isReachingEnd)
    return (
      <ul>
        <h2>End of jobs</h2>
      </ul>
    );
  else if (error)
    return (
      <ul>
        <h2>Something went wrong</h2>
      </ul>
    );
  return (
    <ul>
      {data.map((job) => (
        <li key={job.id}>
          <Link href={`/jobs/${job.id}`}>
            <div className="flex spaceBetween">
              <div>
                <h2 className={styles.company}>{job.company}</h2>
                <p className={styles.role}>{job.role}</p>
              </div>
              <div className={`flexColumn ${styles.date}`}>
                <span>POSTED</span>
                <span>{job.datePosted.split(" ")[0]}</span>
                <span>
                  {job.datePosted.split(" ")[1]} {job.datePosted.split(" ")[2]}
                </span>
              </div>
            </div>
            <div className={styles.skills}>
              {job.skills.split(",").map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
