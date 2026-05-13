import { ThemeClassNames, useThemeConfig } from "@docusaurus/theme-common";
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import type { Props } from "@theme/Navbar/Layout";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";
import clsx from "clsx";
import type { ComponentProps, ReactNode, Ref } from "react";

import styles from "./styles.module.css";

type NavbarShellProps = Props & {
  hideOnScroll: boolean;
  isNavbarVisible?: boolean;
  navbarRef?: Ref<HTMLElement>;
  style?: string;
};

function NavbarBackdrop(props: ComponentProps<"div">): ReactNode {
  return (
    <div
      role="presentation"
      {...props}
      className={clsx("navbar-sidebar__backdrop", props.className)}
    />
  );
}

function NavbarShell({
  children,
  hideOnScroll,
  isNavbarVisible = true,
  navbarRef,
  style,
}: NavbarShellProps): ReactNode {
  const mobileSidebar = useNavbarMobileSidebar();

  return (
    <nav
      ref={navbarRef}
      aria-label={translate({
        id: "theme.NavBar.navAriaLabel",
        message: "Main",
        description: "The ARIA label for the main navigation",
      })}
      className={clsx(
        ThemeClassNames.layout.navbar.container,
        "navbar",
        "navbar--fixed-top",
        hideOnScroll && [
          styles.navbarHideable,
          !isNavbarVisible && styles.navbarHidden,
        ],
        {
          "navbar--dark": style === "dark",
          "navbar--primary": style === "primary",
          "navbar-sidebar--show": mobileSidebar.shown,
        },
      )}
    >
      {children}
      <NavbarBackdrop onClick={mobileSidebar.toggle} />
      <NavbarMobileSidebar />
    </nav>
  );
}

function HideableNavbarLayout({
  children,
  style,
}: Props & { style?: string }): ReactNode {
  const { navbarRef, isNavbarVisible } = useHideableNavbar(true);

  return (
    <NavbarShell
      hideOnScroll
      isNavbarVisible={isNavbarVisible}
      navbarRef={navbarRef}
      style={style}
    >
      {children}
    </NavbarShell>
  );
}

function StaticNavbarLayout({
  children,
  style,
}: Props & { style?: string }): ReactNode {
  return (
    <NavbarShell hideOnScroll={false} style={style}>
      {children}
    </NavbarShell>
  );
}

export default function NavbarLayout({ children }: Props): ReactNode {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();

  if (hideOnScroll) {
    return (
      <HideableNavbarLayout style={style}>{children}</HideableNavbarLayout>
    );
  }

  return <StaticNavbarLayout style={style}>{children}</StaticNavbarLayout>;
}
