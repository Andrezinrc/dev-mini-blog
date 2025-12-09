import React from "react";
import {projects} from '../../constants/projects';
import styles from "./Projects.module.css";

export default function Projects() {
  return (
    <div className={styles.container}>
      {projects.map((p, idx) => (
        <div className={styles.projectItem} key={idx}>
          <div className={styles.title}>{p.title}</div>
          <div className={styles.description}>{p.description}</div>
          <a className={styles.button} href={p.github} target="_blank" rel="noopener noreferrer">
            Ver no GitHub
          </a>
        </div>
      ))}
    </div>
  );
}