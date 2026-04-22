import type { ReactNode } from "react";
import Heading from "@theme/Heading";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "primary" | "accent";
  className?: string;
};

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  tone = "primary",
  className,
}: Props) => {
  return (
    <header className={clsx(styles.heading, className)}>
      <p
        className={clsx(
          styles.eyebrow,
          tone === "accent" ? styles.eyebrowAccent : styles.eyebrowPrimary
        )}
      >
        {eyebrow}
      </p>
      <Heading as="h2" className={styles.title}>
        {title}
      </Heading>
      {description ? <div className={styles.description}>{description}</div> : null}
    </header>
  );
};
