import React from "react";
import styles from "./styles.module.css";

export default function Tag(props) {
  return (
    <div className={`${styles.tag} ${props.className}`} {...props}>
      {props.children}
    </div>
  );
}
