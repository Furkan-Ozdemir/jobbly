import React from "react";
import Link from "next/link";
import Tag from "../Tag";
import styles from "./style.module.css";

export default function JobItem({ data }) {
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
