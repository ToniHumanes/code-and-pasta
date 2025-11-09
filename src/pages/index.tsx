import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import HomepageHeader from "../components/feature/Homepage/Hero";
import HomepageFeatures from "../components/feature/Homepage/Cards";

export default function Home(): ReactNode {
  return (
    <Layout
      title={"Código & Pasta"}
      description="En este espacio llamado Código & Pasta encontrarás apuntes técnicos, reflexiones sobre arquitectura y producto"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
