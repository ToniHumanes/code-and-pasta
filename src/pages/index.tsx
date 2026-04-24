import type { ReactNode } from "react";
import Layout from "@theme/Layout";
import HomepageHeader from "../features/home/components/HeroSection";
import HomepageFeatures from "../features/home/components/FeatureCardsSection";
import HomepageLatestPosts from "../features/home/components/LatestPostsSection";

export default function Home(): ReactNode {
  return (
    <Layout
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
