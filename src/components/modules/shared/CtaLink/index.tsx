import type { ReactNode } from "react";
import Link from "@docusaurus/Link";
import clsx from "clsx";
import styles from "./style.module.css";

const CTA_LINK_KINDS = { primary: "primary", secondary: "secondary" } as const;

type Props = {
  to: string;
  children: ReactNode;
  className?: string;
  kind?: keyof typeof CTA_LINK_KINDS;
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
