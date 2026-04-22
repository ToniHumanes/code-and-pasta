import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import { SectionHeading } from "../../components/shared/SectionHeading";
import { RoadmapCard } from "../../features/roadmap/components/RoadmapCard";
import styles from "./styles.module.css";

type RoadmapItem = {
  title: string;
  description: string;
  applicationText: string;
  isCompleted: boolean;
};

const ROADMAP_ITEMS: RoadmapItem[] = [
  {
    title: "Libro de Pro Git",
    description: "Profundizando en cómo funciona Git por dentro.",
    applicationText:
      "Mejor control de ramas, decisiones más claras en merge o rebase y menos errores en el día a día.",
    isCompleted: false,
  },
];

export default function RoadmapPage(): ReactNode {
  return (
    <Layout
      title="Roadmap"
      description="Hoja de ruta de Código & Pasta con los próximos hitos del sitio."
    >
      <main className={styles.page}>
        <div className="container">
          <section className={styles.section} aria-labelledby="roadmap-title">
            <SectionHeading
              className={styles.heading}
              eyebrow="Roadmap"
              title={
                <span id="roadmap-title">
                  Mi ruta de aprendizaje y proyectos
                </span>
              }
              description="Aquí organizo lo que aprendo, refuerzo fundamentos y lo llevo a proyectos reales, no solo a nivel técnico, también de producto."
            />

            <ol className={styles.list}>
              {ROADMAP_ITEMS.map((item) => (
                <li key={item.title} className={styles.item}>
                  <RoadmapCard className={styles.card} {...item} />
                </li>
              ))}
            </ol>
          </section>
        </div>
      </main>
    </Layout>
  );
}
