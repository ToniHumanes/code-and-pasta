import type { ReactNode } from "react";
import styles from "./styles.module.css";
import { useLatestPostsSection } from "./useLatestPostsSection.hook";
import { CtaLink } from "../../../../components/shared/CtaLink";
import { PostCard } from "../../../../components/shared/PostCard";
import { SectionHeading } from "../../../../components/shared/SectionHeading";

export default function HomepageLatestPosts(): ReactNode {
  const posts = useLatestPostsSection();

  return (
    <section className={styles.latestPosts}>
      <div className="container">
        <SectionHeading
          className={styles.sectionHeading}
          eyebrow="Últimos artículos"
          title="En qué estoy pensando últimamente"
        />

        <div className={styles.postList}>
          {posts.map((post, index) => (
            <PostCard
              key={post.permalink}
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
