import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import intro from "@site/static/img/intro.png";
import workSuchAs from "@site/static/img/workSuchAs.png";
import format from "@site/static/img/format.png";

type FeatureItem = {
  title: string;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Documentar para comprender.",
    image: intro,
    description: (
      <>
        Este es mi cuaderno de aprendizaje: un lugar donde ordeno mis ideas,
        explico conceptos y transformo lo aprendido en conocimiento aplicable.
        En este espacio llamado Código & Pasta 🍝 encontrarás apuntes técnicos,
        reflexiones sobre arquitectura y producto, y mi viaje continuo en el
        mundo del desarrollo.
      </>
    ),
  },
  {
    title: "Frontend con visión de producto.",
    image: workSuchAs,
    description: (
      <>
        Trabajo principalmente con React, TypeScript, arquitectura hexagonal,
        microfrontends y TDD, pero también estoy ampliando mi enfoque hacia
        backend y diseño de sistemas completos. Me interesa entender no solo
        cómo se construye un producto, sino por qué ciertas decisiones generan
        más valor.
      </>
    ),
  },
  {
    title: "Estructura del sitio",
    image: format,
    description: (
      <>
        /docs → mis apuntes técnicos organizados por áreas y ejemplos de código
        de la vida real. <br />
        /blog → artículos con ideas, aprendizajes o reflexiones sobre
        desarrollo. Nos dudéis en visitar las diferentes secciones, nos vemos 👋
      </>
    ),
  },
];

function Feature({ title, image, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureImg} src={image} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
