import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import AboutHero from "../../features/about-me/components/HeroSection";
import openbankdWorkExperience from "@site/static/img/about-me/openbank-work-experience.jpg";
import inditexWorkExperience from "@site/static/img/about-me/inditex-work-experience.jpg";
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
          <section className={styles.cardsContainer}>
            <SectionHeading
              eyebrow="Experiencia"
              title="+9 años construyendo productos digitales"
            ></SectionHeading>
            <ExperienceCard
              image={openbankdWorkExperience}
              imageAlt="Experiencia profesional en Openbank"
              subtitle="Capgemini"
              title="Openbank — Wealth & Crypto"
              description={
                <>
                  <p>
                    Aplicaciones de inversión en entorno bancario internacional.
                  </p>
                  <p>
                    Arquitectura basada en microfrontends y hexagonal, adaptada
                    a distintos países y productos financieros.
                  </p>
                  <p>
                    Impacto: aceleramos el time-to-market manteniendo
                    escalabilidad y una experiencia consistente.
                  </p>
                </>
              }
            />
            <ExperienceCard
              isReversed={true}
              image={inditexWorkExperience}
              imageAlt="Experiencia profesional en Inditex"
              subtitle="Kairós DS"
              title="Inditex — Data Governance Platform"
              description={
                <>
                  <p>
                    Plataforma de gobierno del dato para más de 800 usuarios
                    técnicos y comerciales.
                  </p>
                  <p>
                    Arquitectura de microfrontends con React + TypeScript y
                    colaboración activa en definición de producto (enfoque MVP).
                  </p>
                  <p>
                    Impacto: mejor acceso a datos para la toma de decisiones en
                    negocio.
                  </p>
                </>
              }
            />
            <ExperienceCard
              image={randstadWorkExperience}
              imageAlt="Experiencia profesional en Randstad"
              subtitle="Sngular"
              title="Randstad — Plataforma HR"
              description={
                <>
                  <p>Aplicación web con foco en experiencia de usuario.</p>
                  <p>
                    Liderazgo frontend, creación de design system y migración de
                    MPA a SPA.
                  </p>
                  <p>
                    Impacto: mejora de rendimiento y +15% de usuarios activos.
                  </p>
                </>
              }
            />
          </section>
        </div>
      </main>
    </Layout>
  );
}
