import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import { CardSurface } from "../../base/CardSurface";
import {
  ResponsiveImage,
  type ResponsiveImageSource,
} from "../../base/ResponsiveImage";
import styles from "./style.module.css";

type Props = {
  eyebrow: string;
  title: string;
  image: ResponsiveImageSource;
  description: ReactNode;
  imageWidth?: number;
  imageHeight?: number;
};

export const ContentCard = ({
  eyebrow,
  title,
  image,
  description,
  imageWidth = 64,
  imageHeight = 64,
}: Props) => {
  return (
    <CardSurface className={clsx(styles.card)}>
      <div className={styles.visual}>
        <ResponsiveImage
          {...image}
          className={styles.image}
          width={imageWidth}
          height={imageHeight}
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className={styles.body}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <Heading as="h3" className={styles.title}>
            {title}
          </Heading>
        </header>
        <div className={styles.description}>{description}</div>
      </div>
    </CardSurface>
  );
};
