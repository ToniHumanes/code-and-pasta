import type { ReactNode } from "react";
import Heading from "@theme/Heading";
import { CardSurface } from "../../../../components/base/CardSurface";
import {
  ResponsiveImage,
  type ResponsiveImageSource,
} from "../../../../components/base/ResponsiveImage";
import clsx from "clsx";
import styles from "./styles.module.css";

type Props = {
  title: string;
  subtitle: string;
  description: ReactNode;
  image: ResponsiveImageSource;
  className?: string;
  isReversed?: boolean;
};

export const ExperienceCard = ({
  title,
  subtitle,
  description,
  image,
  className,
  isReversed = false,
}: Props) => {
  return (
    <CardSurface
      className={clsx(
        styles.card,
        isReversed && styles.cardReversed,
        className,
      )}
    >
      <div className={styles.visualWrap}>
        <ResponsiveImage {...image} className={styles.image} />
      </div>

      <div className={styles.body}>
        <header className={styles.header}>
          <p className={styles.subtitle}>{subtitle}</p>
          <Heading as="h3" className={styles.title}>
            {title}
          </Heading>
        </header>
        <div className={styles.description}>{description}</div>
      </div>
    </CardSurface>
  );
};
