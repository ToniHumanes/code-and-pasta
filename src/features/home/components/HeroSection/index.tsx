import type { ReactNode } from "react";
import Heading from "@theme/Heading";
import ThemedImage from "@theme/ThemedImage";
import codeAndPastaDarkImage from "@site/static/img/home/code-and-pasta-dark.webp";
import codeAndPastaLightImage from "@site/static/img/home/code-and-pasta-light.webp";
import { CtaLink } from "../../../../components/shared/CtaLink";
import styles from "./styles.module.css";

function HomepageHeader(): ReactNode {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <section className={styles.heroContent}>
          <div className={styles.heroMedia}>
            <ThemedImage
              sources={{
                light: codeAndPastaLightImage,
                dark: codeAndPastaDarkImage,
              }}
              alt="Código & Pasta"
              className={styles.heroImage}
            />
          </div>

          <div className={styles.heroCopy}>
            <Heading as="h1" className={styles.heroTitle}>
              Código & Pasta
            </Heading>
            <p className={styles.heroDescription}>
              Es un espacio donde hablo sobre
              <strong> desarrollo de software</strong> (código) y
              <strong> producto</strong> (pasta).
            </p>
            <p className={styles.heroDescription}>
              También es <strong>mi diario de aprendizaje</strong>: cómo veo la
              tecnología y cómo intento construir software que aporte valor.
            </p>
            <div className={styles.heroLinks}>
              <CtaLink to="/blog">Ir al blog</CtaLink>
              <CtaLink to="/about-me" kind="secondary">
                ¿Quién soy?
              </CtaLink>
            </div>
          </div>
        </section>
      </div>
    </header>
  );
}

export default HomepageHeader;
