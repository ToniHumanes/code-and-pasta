import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import intro from "@site/static/img/intro.png";
import workSuchAs from "@site/static/img/workSuchAs.png";
import format from "@site/static/img/format.png";
import { useRevealOnView } from "../useRevealOnView";

type FeatureItem = {
  eyebrow: string;
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    eyebrow: "Sobre mí",
    title: "Documentar para comprender.",
    image: intro,
    description: (
      <>
        Este espacio nace como un cuaderno de aprendizaje donde ordeno ideas,
        convierto conceptos en explicaciones útiles y doy contexto a lo que voy
        descubriendo mientras trabajo y construyo productos.
      </>
    ),
  },
  {
    eyebrow: "Mi trabajo",
    title: "Frontend con visión de producto.",
    image: workSuchAs,
    description: (
      <>
        Trabajo con React, TypeScript y arquitectura frontend, pero me interesa
        tanto la implementación como el criterio detrás de cada decisión:
        negocio, experiencia de usuario y sostenibilidad técnica.
      </>
    ),
  },
  {
    eyebrow: "Qué encontrarás",
    title: "Estructura del sitio",
    image: format,
    description: (
      <>
        Aquí conviven dos formatos. Los <strong>docs</strong> para apuntes
        técnicos más estructurados, y el <strong>blog</strong> para artículos
        con reflexiones sobre desarrollo, producto y aprendizaje continuo.
      </>
    ),
  },
];

function Feature({
  eyebrow,
  title,
  image,
  description,
  index,
  isVisible,
}: FeatureItem & { index: number; isVisible: boolean }) {
  return (
    <article
      className={clsx(styles.featureCard, isVisible && styles.featureCardVisible)}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className={styles.featureVisual}>
        <img className={styles.featureImg} src={image} alt={title} />
      </div>
      <div className={styles.featureBody}>
        <p className={styles.featureEyebrow}>{eyebrow}</p>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </article>
  );
}

export default function HomepageFeatures(): ReactNode {
  const { ref, isVisible } = useRevealOnView<HTMLElement>(0.18);

  return (
    <section className={styles.features} ref={ref}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <p className={styles.featuresEyebrow}>Presentación</p>
          <Heading as="h2" className={styles.featuresTitle}>
            Una portada más cercana a cómo trabajo: criterio, producto y código.
          </Heading>
        </div>

        <div className={styles.featuresGrid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} index={idx} isVisible={isVisible} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
