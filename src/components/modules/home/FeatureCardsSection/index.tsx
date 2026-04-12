import type { ReactNode } from "react";
import styles from "./styles.module.css";
import intro from "@site/static/img/intro.png";
import workSuchAs from "@site/static/img/workSuchAs.png";
import format from "@site/static/img/format.png";
import { useRevealOnView } from "@site/src/hooks/useRevealOnView";
import { ContentCard } from "../../shared/ContentCard";
import { SectionHeading } from "../../shared/SectionHeading";

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

export default function HomepageFeatures(): ReactNode {
  const { ref, isVisible } = useRevealOnView<HTMLElement>(0.18);

  return (
    <section className={styles.features} ref={ref}>
      <div className="container">
        <SectionHeading
          className={styles.featuresHeader}
          eyebrow="Presentación"
          title="Una portada más cercana a cómo trabajo: criterio, producto y código."
          tone="accent"
        />

        <div className={styles.featuresGrid}>
          {FeatureList.map((props, idx) => (
            <ContentCard
              key={props.title}
              delayMs={idx * 120}
              isVisible={isVisible}
              {...props}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
