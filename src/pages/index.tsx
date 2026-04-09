import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import HomepageHeader from "../components/feature/Homepage/Hero";
import HomepageFeatures from "../components/feature/Homepage/Cards";
import HomepageLatestPosts from "../components/feature/Homepage/LatestPosts";

export default function Home(): ReactNode {
  return (
    <Layout
      title={"Código & Pasta"}
      description="En este espacio llamado Código & Pasta encontrarás apuntes técnicos, reflexiones sobre arquitectura y producto"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageLatestPosts />
      </main>
    </Layout>
  );
}
