import type { ReactNode } from "react";
import Heading from "@theme/Heading";
import { ThemedResponsiveImage } from "../../../../components/base/ThemedResponsiveImage";
import { CtaLink } from "../../../../components/shared/CtaLink";
import styles from "./styles.module.css";

const heroImageSizes = "(max-width: 996px) 22rem, 24rem";

function HomepageHeader(): ReactNode {
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <section className={styles.heroContent}>
          <div className={styles.heroMedia}>
            <ThemedResponsiveImage
              sources={{
                light: {
                  desktopSrc: "/img/home/code-and-pasta-light.webp",
                  mobileSrc: "/img/home/code-and-pasta-light-mobile.webp",
                  alt: "Código & Pasta",
                },
                dark: {
                  desktopSrc: "/img/home/code-and-pasta-dark.webp",
                  mobileSrc: "/img/home/code-and-pasta-dark-mobile.webp",
                  alt: "Código & Pasta",
                },
              }}
              className={styles.heroImage}
              width="720"
              height="720"
              sizes={heroImageSizes}
              loading="eager"
              fetchPriority="high"
              decoding="async"
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
