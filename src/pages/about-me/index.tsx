import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import AboutHero from "../../features/about-me/components/HeroSection";
import randstadWorkExperience from "@site/static/img/about-me/randstad-work-experience.jpg";
import { ExperienceCard } from "../../features/about-me/components/ExperienceCard";
import { SectionHeading } from "../../components/shared/SectionHeading";
import styles from "./styles.module.css";

export default function AboutMe(): ReactNode {
  return (
    <Layout
      title="Sobre mí"
      description="Conoce mejor a Antonio Humanes, su forma de trabajar y las áreas en las que aporta más valor."
    >
      <AboutHero />
      <main>
        <div className="container">
          <section className={styles.cards__container}>
            <SectionHeading
              eyebrow="Experiencia"
              title="Añadir aquí experiencia con carrusel de proyectos, experiencia
              laboral, etc"
            ></SectionHeading>
            <ExperienceCard
              image={randstadWorkExperience}
              imageAlt="Experiencia profesional en Randstad"
              subtitle="Sngular - Randstad"
              title="Construyendo producto digital desde frontend con foco en escalabilidad."
              description={
                <>
                  <p>
                    He trabajado desarrollando interfaces y productos web con
                    React y TypeScript, colaborando con negocio, diseño y otros
                    perfiles técnicos para convertir requisitos complejos en
                    soluciones mantenibles, claras y orientadas a impacto real.
                  </p>
                  <p>
                    He trabajado desarrollando interfaces y productos web con
                    React y TypeScript, colaborando con negocio, diseño y otros
                    perfiles técnicos para convertir requisitos complejos en
                    soluciones mantenibles, claras y orientadas a impacto real.
                  </p>
                  <ul>
                    <li>
                      He trabajado desarrollando interfaces y productos web con
                      React y TypeScript
                    </li>
                    <li>
                      He trabajado desarrollando interfaces y productos web con
                      React y TypeScript
                    </li>
                    <li>
                      He trabajado desarrollando interfaces y productos web con
                      React y TypeScript
                    </li>
                    <li>
                      He trabajado desarrollando interfaces y productos web con
                      React y TypeScript
                    </li>
                  </ul>
                </>
              }
            />
            <ExperienceCard
              isReversed={true}
              image={randstadWorkExperience}
              imageAlt="Experiencia profesional en Randstad"
              subtitle="Randstad Digital"
              title="Construyendo producto digital desde frontend con foco en escalabilidad."
              description={
                <>
                  He trabajado desarrollando interfaces y productos web con
                  React y TypeScript, colaborando con negocio, diseño y otros
                  perfiles técnicos para convertir requisitos complejos en
                  soluciones mantenibles, claras y orientadas a impacto real.
                </>
              }
            />
            <ExperienceCard
              image={randstadWorkExperience}
              imageAlt="Experiencia profesional en Randstad"
              subtitle="Randstad Digital"
              title="Construyendo producto digital desde frontend con foco en escalabilidad."
              description={
                <>
                  He trabajado desarrollando interfaces y productos web con
                  React y TypeScript, colaborando con negocio, diseño y otros
                  perfiles técnicos para convertir requisitos complejos en
                  soluciones mantenibles, claras y orientadas a impacto real.
                </>
              }
            />
          </section>
        </div>
      </main>
    </Layout>
  );
}
