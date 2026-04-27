import Heading from "@theme/Heading";
import profileImg from "@site/static/img/about-me/profile-image.webp";
import styles from "./styles.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { CtaLink } from "../../../../components/shared/CtaLink";

function AboutHero() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <section className={styles.heroContent}>
          <aside>
            <img
              src={profileImg}
              alt="Antonio Humanes"
              className={styles.heroImage}
            />
          </aside>

          <div className={styles.heroCopy}>
            <Heading as="h1" className={styles.heroTitle}>
              Antonio Humanes
            </Heading>
            <p className={styles.heroSubtitle}>
              Senior Frontend Developer con visión de producto
            </p>
            <p className={styles.heroDescription}>
              Construyo software y tomo decisiones con un objetivo claro: que lo
              que hacemos tenga sentido para el negocio y para el usuario.
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
export default AboutHero;
