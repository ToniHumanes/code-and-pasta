import clsx from "clsx";
import Heading from "@theme/Heading";
import Link from "@docusaurus/Link";
import {
  ResponsiveImage,
  type ResponsiveImageSource,
} from "../../base/ResponsiveImage";
import styles from "./style.module.css";

type Props = {
  title: string;
  permalink: string;
  date: string;
  description: string;
  image: ResponsiveImageSource;
  imageWidth?: number;
  imageHeight?: number;
  actionLabel?: string;
  isVisible?: boolean;
  isReversed?: boolean;
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
  imageWidth = 1200,
  imageHeight = 800,
  actionLabel = "Leer artículo",
  isReversed = false,
}: Props) => {
  return (
    <article
      className={clsx(styles.postCard, isReversed && styles.postCardReverse)}
    >
      <Link className={styles.postVisualLink} to={permalink}>
        <ResponsiveImage
          {...image}
          className={styles.postImage}
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
          decoding="async"
        />
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
