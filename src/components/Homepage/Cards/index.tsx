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
    title: "Documentación técnica y blog",
    image: intro,
    description: (
      <>
        Documento la trayectoria de mi camino como desarrollador que aprende,
        cuestiona y construye con propósito. Uso este espacio para ordenar mis
        ideas y seguir creciendo como desarrollador
      </>
    ),
  },
  {
    title: "Mi trabajo como desarrollador",
    image: workSuchAs,
    description: (
      <>
        Trabajo en frontend (React, TypeScript, arquitectura) aunque actualmente
        estoy expandiendome en backend y este sitio es mi espacio para
        reflexionar, practicar y documentar lo que voy aprendiendo
      </>
    ),
  },
  {
    title: "Formato del sitio",
    image: format,
    description: (
      <>
        <p>/docs → mis apuntes técnicos organizados.</p>
        <p>
          /blog → artículos breves con ideas, aprendizajes o dudas que me hacen
          pensar
        </p>
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
