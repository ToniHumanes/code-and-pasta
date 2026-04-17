import type { ReactNode } from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import { useRevealOnView } from "@site/src/hooks/useRevealOnView";
import styles from "./styles.module.css";
import { CtaLink } from "../../shared/CtaLink";
import { PostCard } from "../../shared/PostCard";
import { SectionHeading } from "../../shared/SectionHeading";

type BlogPostModule = {
  metadata: {
    title: string;
    permalink: string;
    date: string;
    description?: string;
    unlisted?: boolean;
  };
  frontMatter: {
    draft?: boolean;
    image?: string;
  };
  assets?: {
    image?: string;
  };
};

type PostItem = {
  title: string;
  permalink: string;
  date: string;
  description: string;
  image: string;
};

const blogContext = require.context("@site/blog", true, /\.(md|mdx)$/);
const allPosts = blogContext
  .keys()
  .map((modulePath) => blogContext(modulePath) as BlogPostModule);

function getLatestPosts(fallbackPostImage: string): PostItem[] {
  return allPosts
    .filter((post) => !post.metadata.unlisted && !post.frontMatter.draft)
    .sort(
      (current, next) =>
        new Date(next.metadata.date).getTime() -
        new Date(current.metadata.date).getTime(),
    )
    .slice(0, 2)
    .map((post) => ({
      title: post.metadata.title,
      permalink: post.metadata.permalink,
      date: post.metadata.date,
      description:
        post.metadata.description ??
        "Reflexiones prácticas sobre producto, desarrollo y aprendizaje.",
      image: post.assets?.image ?? post.frontMatter.image ?? fallbackPostImage,
    }));
}

export default function HomepageLatestPosts(): ReactNode {
  const fallbackPostImage = useBaseUrl("/img/logo.png");
  const posts = getLatestPosts(fallbackPostImage);
  const { ref, isVisible } = useRevealOnView<HTMLElement>(0.18);

  return (
    <section className={styles.latestPosts} ref={ref}>
      <div className="container">
        <SectionHeading
          className={styles.sectionHeading}
          eyebrow="Últimos artículos"
          title="Ideas recientes sobre desarrollo, producto y aprendizaje continuo."
        />

        <div className={styles.postList}>
          {posts.map((post, index) => (
            <PostCard
              key={post.permalink}
              delayMs={index * 140}
              isVisible={isVisible}
              isReversed={index % 2 === 1}
              {...post}
            />
          ))}
        </div>

        <div className={styles.actions}>
          <CtaLink to="/blog">Ver más</CtaLink>
        </div>
      </div>
    </section>
  );
}
