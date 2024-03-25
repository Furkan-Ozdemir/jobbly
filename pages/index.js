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
  "Data",
  "Legal",
  "HR",
  "IT",
  "Admin",
  "Other",
];
const jobListings = [
  {
    company: "HUBX",
    role: "Software Developer (New Grad)",
    datePosted: {
      span1: "POSTED",
      span2: "2",
      span3: "DAYS AGO",
    },
    skills: ["Next.js", "CSS", "Frontend", "React"],
  },
  {
    company: "DoorDash",
    role: "Software Developer (New Grad)",
    datePosted: {
      span1: "POSTED",
      span2: "1",
      span3: "DAY AGO",
    },
    skills: ["JavaScript", "HTML", "CSS", "Node.js"],
  },
  {
    company: "Google",
    role: "Software Engineer, New Grad",
    datePosted: {
      span1: "POSTED",
      span2: "3",
      span3: "DAYS AGO",
    },
    skills: ["Java", "Python", "C++", "JavaScript"],
  },
  {
    company: "NVIDIA",
    role: "Software Engineer - New College Graduate",
    datePosted: {
      span1: "POSTED",
      span2: "1",
      span3: "WEEK AGO",
    },
    skills: ["C/C++", "CUDA", "Python", "Machine Learning"],
  },
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
        <ul>
          {jobListings.map((job) => (
            <li key={job.company}>
              <div className="flex spaceBetween">
                <div>
                  <h2 className={styles.company}>{job.company}</h2>
                  <p className={styles.role}>{job.role}</p>
                </div>
                <div className={`flexColumn ${styles.date}`}>
                  <span>{job.datePosted.span1}</span>
                  <span>{job.datePosted.span2}</span>
                  <span>{job.datePosted.span3}</span>
                </div>
              </div>
              <div className={styles.skills}>
                {job.skills.map((skill) => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
