import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import { CardSurface } from "../../base/CardSurface";
import styles from "./style.module.css";

type Props = {
  eyebrow: string;
  title: string;
  image: string;
  description: ReactNode;
};

export const ContentCard = ({ eyebrow, title, image, description }: Props) => {
  return (
    <CardSurface className={clsx(styles.card)}>
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
    </CardSurface>
  );
};
