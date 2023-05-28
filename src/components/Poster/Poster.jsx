import React from "react";

import styles from "../../styles/Home.module.css";

import BG from "../../images/picture_bg.jpg";

const Poster = () => (
  <section className={styles.home}>
    <div className={styles.title}>BUY ANY PICTURES</div>
    <div className={styles.product}>
      <div className={styles.text}>
        <div className={styles.subtitle}>Buy a painting of any image</div>
        <h1 className={styles.head}>Buy a finished painting or order a painting under the photo</h1>
      </div>
      <div className={styles.image}>
        <img src={BG} className="picture_background" alt="img_bg" />
      </div>
    </div>
  </section>
);

export default Poster;
