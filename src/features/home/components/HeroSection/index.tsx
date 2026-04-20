import type { ReactNode } from "react";
import Heading from "@theme/Heading";
import { useColorMode } from "@docusaurus/theme-common";
import codeAndPastaDarkImage from "@site/static/img/home/code-and-pasta-dark.png";
import codeAndPastaLightImage from "@site/static/img/home/code-and-pasta-light.png";
import { CtaLink } from "../../../../components/shared/CtaLink";
import styles from "./styles.module.css";

function HomepageHeader(): ReactNode {
  const { colorMode } = useColorMode();
  const codeAndPastaImage =
    colorMode === "dark" ? codeAndPastaDarkImage : codeAndPastaLightImage;

  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <section className={styles.heroContent}>
          <div className={styles.heroMedia}>
            <img
              src={codeAndPastaImage}
              alt="Código & Pasta"
              className={styles.heroImage}
            />
          </div>

          <div className={styles.heroCopy}>
            <Heading as="h1" className={styles.heroTitle}>
              Código & Pasta
            </Heading>
            <p className={styles.heroDescription}>
              Un espacio personal para escribir sobre desarrollo, arquitectura
              frontend y producto con una idea simple: hacer software útil,
              entendible y con intención.
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
