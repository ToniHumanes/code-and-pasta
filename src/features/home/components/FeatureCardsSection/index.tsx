import type { ReactNode } from "react";
import styles from "./styles.module.css";
import { ContentCard } from "../../../../components/shared/ContentCard";
import { SectionHeading } from "../../../../components/shared/SectionHeading";

type FeatureItem = {
  eyebrow: string;
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    eyebrow: "Sobre mí",
    title: "Cuestiono decisiones, incluso las mías.",
    image: "/img/home/intro.webp",
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
    image: "/img/home/workSuchAs.webp",
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
    image: "/img/home/format.webp",
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
