import React from "react";
import Link from "next/link";
import Tag from "../Tag";
import styles from "./style.module.css";
export default function JobItem({ data, loading, isEmpty, isReachingEnd }) {
  if (loading)
    return (
      <ul className={styles.loaderContainer}>
        <div className={styles.loader}></div>
      </ul>
    );
  else if (isEmpty)
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
  else if (!loading && data) {
    data = data.map((job) => {
      return {
        ...job,
        datePosted: formatDateDifference(job.datePosted, new Date()),
      };
    });
  }
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
