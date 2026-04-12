import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import HomepageHeader from "../components/modules/home/HeroSection";
import HomepageFeatures from "../components/modules/home/FeatureCardsSection";
import HomepageLatestPosts from "../components/modules/home/LatestPostsSection";

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
