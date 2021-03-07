import React, { ReactElement } from "react";

import styles from "./SnowLoader.module.css";

export function SnowLoader(): ReactElement {
  return(
    <div className={styles.wrapper}>
      <div className={`${styles.snow} ${styles.layer1} ${styles.a}`}></div>
      <div className={`${styles.snow} ${styles.layer1}`}></div>

      <div className={`${styles.snow} ${styles.layer2} ${styles.a}`}></div>
      <div className={`${styles.snow} ${styles.layer2}`}></div>

      <div className={`${styles.snow} ${styles.layer3} ${styles.a}`}></div>
      <div className={`${styles.snow} ${styles.layer3}`}></div>
    </div>
  );
}
