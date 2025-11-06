import Heading from "@theme/Heading";
import profileImg from "@site/static/img/profile-image.jpg";
import styles from "./styles.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import clsx from "clsx";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <section className={styles.hero__content}>
          <img
            src={profileImg}
            alt="My Profile Image"
            className={styles.hero__image}
          />
          <div>
            <Heading as="h1" className={styles.hero__title}>
              {siteConfig.title}
            </Heading>
            <p className={styles.hero__subtitle}>
              Software & Frontend Developer
            </p>
          </div>
        </section>
      </div>
    </header>
  );
}
export default HomepageHeader;
