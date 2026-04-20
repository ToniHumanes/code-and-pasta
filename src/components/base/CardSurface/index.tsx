import type { ReactNode } from "react";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = {
  children: ReactNode;
  className?: string;
};

export const CardSurface = ({ children, className }: Props) => {
  return <article className={clsx(styles.surface, className)}>{children}</article>;
};
