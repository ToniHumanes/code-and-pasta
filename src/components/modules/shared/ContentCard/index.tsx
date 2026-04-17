import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./style.module.css";

type Props = {
  eyebrow: string;
  title: string;
  image: string;
  description: ReactNode;
  isVisible?: boolean;
  delayMs?: number;
};

export const ContentCard = ({
  eyebrow,
  title,
  image,
  description,
  isVisible = false,
  delayMs = 0,
}: Props) => {
  return (
    <article
      className={clsx(styles.card, isVisible && styles.cardVisible)}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      <div className={styles.visual}>
        <img className={styles.image} src={image} alt={title} />
      </div>
      <div className={styles.body}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <Heading as="h3" className={styles.title}>
          {title}
        </Heading>
        <p className={styles.description}>{description}</p>
      </div>
    </article>
  );
};
