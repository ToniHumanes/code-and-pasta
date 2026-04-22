import Heading from "@theme/Heading";
import clsx from "clsx";
import { CardSurface } from "../../../../components/base/CardSurface";
import styles from "./styles.module.css";

type Props = {
  title: string;
  description: string;
  applicationText: string;
  isCompleted: boolean;
  className?: string;
};

export const RoadmapCard = ({
  title,
  description,
  applicationText,
  isCompleted,
  className,
}: Props) => {
  return (
    <CardSurface
      aria-disabled={isCompleted}
      className={clsx(
        styles.card,
        isCompleted && styles.cardCompleted,
        className,
      )}
    >
      <div className={styles.content}>
        <p
          className={clsx(
            styles.status,
            isCompleted ? styles.statusCompleted : styles.statusPending,
          )}
        >
          {isCompleted ? "Completado" : "En progreso"}
        </p>
        <Heading as="h3" className={styles.title}>
          {title}
        </Heading>
        <p className={styles.description}>{description}</p>
        <p className={styles.applicationText}>
          <span className={styles.applicationLabel}>Aplicación:</span>{" "}
          {applicationText}
        </p>
      </div>
    </CardSurface>
  );
};
