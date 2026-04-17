import clsx from "clsx";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import styles from "./style.module.css";

type Props = {
  title: string;
  permalink: string;
  date: string;
  description: string;
  image: string;
  actionLabel?: string;
  isVisible?: boolean;
  isReversed?: boolean;
  delayMs?: number;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export const PostCard = ({
  title,
  permalink,
  date,
  description,
  image,
  actionLabel = "Leer artículo",
  isVisible = false,
  isReversed = false,
  delayMs = 0,
}: Props) => {
  return (
    <article
      className={clsx(
        styles.postCard,
        isReversed && styles.postCardReverse,
        isVisible && styles.postCardVisible
      )}
      style={{ transitionDelay: `${delayMs}ms` }}
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
          {actionLabel}
        </Link>
      </div>
    </article>
  );
};
