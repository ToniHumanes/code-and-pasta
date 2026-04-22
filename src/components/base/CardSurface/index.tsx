import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = ComponentPropsWithoutRef<"article"> & {
  children: ReactNode;
  className?: string;
};

export const CardSurface = ({ children, className, ...props }: Props) => {
  return (
    <article {...props} className={clsx(styles.surface, className)}>
      {children}
    </article>
  );
};
