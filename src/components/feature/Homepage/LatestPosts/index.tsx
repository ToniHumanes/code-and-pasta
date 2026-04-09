import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import { useRevealOnView } from "../useRevealOnView";

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
        new Date(current.metadata.date).getTime()
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

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function PostCard({
  title,
  permalink,
  date,
  description,
  image,
  index,
  isVisible,
}: PostItem & { index: number; isVisible: boolean }) {
  return (
    <article
      className={clsx(
        styles.postCard,
        index % 2 === 1 && styles.postCardReverse,
        isVisible && styles.postCardVisible
      )}
      style={{ transitionDelay: `${index * 140}ms` }}
    >
      <Link className={styles.postVisualLink} to={permalink}>
        <img className={styles.postImage} src={image} alt={title} />
      </Link>

      <div className={styles.postContent}>
        <p className={styles.postMeta}>{formatDate(date)}</p>
        <Heading as="h3" className={styles.postTitle}>
          <Link className={styles.postTitleLink} to={permalink}>
            {title}
          </Link>
        </Heading>
        <p className={styles.postDescription}>{description}</p>
        <Link className={styles.postLink} to={permalink}>
          Leer artículo
        </Link>
      </div>
    </article>
  );
}

export default function HomepageLatestPosts(): ReactNode {
  const fallbackPostImage = useBaseUrl("/img/logo.png");
  const posts = getLatestPosts(fallbackPostImage);
  const { ref, isVisible } = useRevealOnView<HTMLElement>(0.18);

  return (
    <section className={styles.latestPosts} ref={ref}>
      <div className="container">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>Últimos artículos</p>
          <Heading as="h2" className={styles.title}>
            Ideas recientes sobre desarrollo, producto y aprendizaje continuo.
          </Heading>
        </div>

        <div className={styles.postList}>
          {posts.map((post, index) => (
            <PostCard
              key={post.permalink}
              index={index}
              isVisible={isVisible}
              {...post}
            />
          ))}
        </div>

        <div className={styles.actions}>
          <Link className={styles.blogButton} to="/blog">
            Ver el blog
          </Link>
        </div>
      </div>
    </section>
  );
}
