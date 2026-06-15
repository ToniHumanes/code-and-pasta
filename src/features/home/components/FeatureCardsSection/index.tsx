import type { ReactNode } from "react";

import type { ResponsiveImageSource } from "../../../../components/base/ResponsiveImage";
import { ContentCard } from "../../../../components/shared/ContentCard";
import { SectionHeading } from "../../../../components/shared/SectionHeading";
import styles from "./styles.module.css";

type FeatureItem = {
  eyebrow: string;
  title: string;
  image: ResponsiveImageSource;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    eyebrow: "Sobre mí",
    title: "¿Qué quiero aportar?",
    image: {
      desktopSrc: "/img/home/intro.webp",
      mobileSrc: "/img/home/intro-mobile.webp",
      alt: "Cuestiono decisiones, incluso las mías.",
    },
    description: (
      <>
        Este espacio es donde comparto aprendizajes reales sobre cómo construyo
        software en el día a día: decisiones técnicas, dudas, errores y el
        impacto que todo eso tiene en el producto.
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
        Trabajo principalmente con React y TypeScript, pero intento no quedarme
        solo en la herramienta. Me interesa entender por qué se construye algo,
        para quién, qué coste tiene mantenerlo y qué valor aporta de verdad.
      </>
    ),
  },
  {
    eyebrow: "¿Qué encontrarás?",
    title: "Decisiones, errores y contexto.",
    image: {
      desktopSrc: "/img/home/format.webp",
      mobileSrc: "/img/home/format-mobile.webp",
      alt: "Decisiones, errores y contexto.",
    },
    description: (
      <>
        Reflexiones sobre desarrollo y producto: cosas que me han funcionado,
        otras que no, decisiones imperfectas y aprendizajes que solo aparecen
        cuando bajas la teoría a tierra.
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
