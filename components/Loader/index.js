import React from "react";
import styles from "./styles.module.css";
export default function index() {
  // props to https://css-loaders.com/arcade/
  return (
    <div className={styles.center}>
      <div className={styles.loader}></div>
    </div>
  );
}
