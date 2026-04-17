import Heading from "@theme/Heading";
import profileImg from "@site/static/img/profile-image.jpg";
import styles from "./styles.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { CtaLink } from "../../shared/CtaLink";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <section className={styles.heroContent}>
          <aside className={styles.heroProfileCard}>
            <img
              src={profileImg}
              alt="Antonio Humanes"
              className={styles.heroImage}
            />
            <div className={styles.heroProfileCopy}>
              <p className={styles.heroProfileLabel}>Escribo sobre</p>
              <p className={styles.heroProfileText}>
                desarrollo, negocio, aprendizaje continuo y cómo construir
                software útil sin perder el criterio por el camino.
              </p>
            </div>
          </aside>

          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>Código & Pasta</p>
            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>
            <p className={styles.heroSubtitle}>
              Senior Frontend Developer | Product Mindset | Building Scalable
              Web Applications
            </p>
            <p className={styles.heroDescription}>
              Construyo productos digitales con foco en claridad técnica,
              experiencia de usuario y decisiones que generen valor real.
            </p>
            <div className={styles.heroTags}>
              <span>React & TypeScript</span>
              <span>Producto</span>
              <span>Arquitectura frontend</span>
            </div>
            <div className={styles.heroActions}>
              <CtaLink to="/blog">Ir al blog</CtaLink>
              <CtaLink
                to="https://www.linkedin.com/in/antoniohumanes/"
                kind="secondary"
              >
                ¿Hablamos en LinkedIn?
              </CtaLink>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}
export default HomepageHeader;
