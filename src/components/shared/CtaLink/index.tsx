import Link from "@docusaurus/Link";
import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./style.module.css";

type Props = {
  to: string;
  children: ReactNode;
  className?: string;
  kind?: "primary" | "secondary";
};

export const CtaLink = ({ to, children, className, kind }: Props) => {
  return (
    <Link
      className={clsx(
        styles.ctaLink,
        className,
        kind && styles[`ctaLink--${kind}`],
      )}
      to={to}
    >
      {children}
    </Link>
  );
};
