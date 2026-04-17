import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./style.module.css";

type Props = {
  to: string;
  children: ReactNode;
  className?: string;
};

export const CtaLink = ({ to, children, className }: Props) => {
  return (
    <Link className={clsx(styles.ctaLink, className)} to={to}>
      {children}
    </Link>
  );
};
