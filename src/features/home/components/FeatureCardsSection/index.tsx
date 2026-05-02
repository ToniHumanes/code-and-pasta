import type { ReactNode } from "react";
import type { ResponsiveImageSource } from "../../../../components/base/ResponsiveImage";
import styles from "./styles.module.css";
import { ContentCard } from "../../../../components/shared/ContentCard";
import { SectionHeading } from "../../../../components/shared/SectionHeading";

type FeatureItem = {
  eyebrow: string;
  title: string;
  image: ResponsiveImageSource;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    eyebrow: "Sobre mí",
    title: "Cuestiono decisiones, incluso las mías.",
    image: {
      desktopSrc: "/img/home/intro.webp",
      mobileSrc: "/img/home/intro-mobile.webp",
      alt: "Cuestiono decisiones, incluso las mías.",
    },
    description: (
      <>
        Este espacio es donde comparto cómo construyo software y producto en el
        día a día, con criterio en cada decisión técnica y de producto.
      </>
    ),
  },
  {
    eyebrow: "Mi trabajo",
    title: "Desarrollo con visión de producto.",
    image: {
      desktopSrc: "/img/home/workSuchAs.webp",
      mobileSrc: "/img/home/workSuchAs-mobile.webp",
      alt: "Desarrollo con visión de producto.",
    },
    description: (
      <>
        Trabajo con React y TypeScript, pero lo importante no es la tecnología:
        es el criterio detrás de cada decisión de negocio, experiencia de
        usuario y sostenibilidad técnica.
      </>
    ),
  },
  {
    eyebrow: "¿Qué encontrarás?",
    title: "Mi visión.",
    image: {
      desktopSrc: "/img/home/format.webp",
      mobileSrc: "/img/home/format-mobile.webp",
      alt: "Mi visión.",
    },
    description: (
      <>
        Reflexiones sobre desarrollo y producto: cosas que me han funcionado,
        otras que no, y decisiones con las que quizá no estés de acuerdo.
      </>
    ),
  },
];

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <SectionHeading
          className={styles.featuresHeader}
          eyebrow="Presentación"
          title="Criterio, Producto y Código."
          tone="accent"
        />

        <div className={styles.featuresGrid}>
          {FeatureList.map((props) => (
            <ContentCard key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
