import type { ReactNode } from "react";
import Heading from "@theme/Heading";
import { CardSurface } from "../../../../components/base/CardSurface";
import clsx from "clsx";
import styles from "./styles.module.css";

type Props = {
  title: string;
  subtitle: string;
  description: ReactNode;
  image: string;
  imageAlt: string;
  className?: string;
  isReversed?: boolean;
};

export const ExperienceCard = ({
  title,
  subtitle,
  description,
  image,
  imageAlt,
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
        <img className={styles.image} src={image} alt={imageAlt} />
      </div>

      <div className={styles.body}>
        <p className={styles.subtitle}>{subtitle}</p>
        <Heading as="h3" className={styles.title}>
          {title}
        </Heading>
        <p className={styles.description}>{description}</p>
      </div>
    </CardSurface>
  );
};
