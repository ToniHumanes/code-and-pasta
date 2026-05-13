import { ThemeClassNames, useThemeConfig } from "@docusaurus/theme-common";
import {
  useHideableNavbar,
  useNavbarMobileSidebar,
} from "@docusaurus/theme-common/internal";
import { translate } from "@docusaurus/Translate";
import type { Props } from "@theme/Navbar/Layout";
import NavbarMobileSidebar from "@theme/Navbar/MobileSidebar";
import clsx from "clsx";
import {
  type ComponentProps,
  type JSX,
  type KeyboardEvent,
  type Ref,
  useCallback,
  useMemo,
} from "react";

import styles from "./styles.module.css";

type NavbarStyle = "dark" | "primary";

type NavbarLayoutShellProps = Props & { style?: NavbarStyle };

type NavbarShellProps = NavbarLayoutShellProps & {
  hideOnScroll: boolean;
  isNavbarVisible?: boolean;
  navbarRef?: Ref<HTMLElement>;
};

const NAVBAR_BACKDROP_ARIA_LABEL = {
  id: "theme.NavBar.backdropAriaLabel",
  message: "Close navigation menu",
  description: "The ARIA label for the mobile navigation backdrop",
} as const;

const NAVBAR_ARIA_LABEL = {
  id: "theme.NavBar.navAriaLabel",
  message: "Main",
  description: "The ARIA label for the main navigation",
} as const;

const getNavbarClassName = (
  hideOnScroll: boolean,
  isNavbarVisible: boolean,
  style: NavbarStyle | undefined,
  shown: boolean,
) =>
  clsx(ThemeClassNames.layout.navbar.container, "navbar navbar--fixed-top", {
    [styles.navbarHideable]: hideOnScroll,
    [styles.navbarHidden]: hideOnScroll && !isNavbarVisible,
    "navbar--dark": style === "dark",
    "navbar--primary": style === "primary",
    "navbar-sidebar--show": shown,
  });

const NavbarBackdrop = ({
  className: customClassName,
  ...props
}: ComponentProps<"button">): JSX.Element => {
  const className = useMemo(
    () =>
      clsx("navbar-sidebar__backdrop", styles.navbarBackdrop, customClassName),
    [customClassName],
  );

  return (
    <button
      type="button"
      aria-label={translate(NAVBAR_BACKDROP_ARIA_LABEL)}
      {...props}
      className={className}
    />
  );
};

const NavbarShell = ({
  children,
  hideOnScroll,
  isNavbarVisible = true,
  navbarRef,
  style,
}: NavbarShellProps): JSX.Element => {
  const { shown, toggle } = useNavbarMobileSidebar();
  const className = useMemo(
    () => getNavbarClassName(hideOnScroll, isNavbarVisible, style, shown),
    [hideOnScroll, isNavbarVisible, shown, style],
  );
  const handleBackdropKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Escape" && shown) {
        event.preventDefault();
        toggle();
      }
    },
    [shown, toggle],
  );

  return (
    <nav
      ref={navbarRef}
      aria-label={translate(NAVBAR_ARIA_LABEL)}
      className={className}
    >
      {children}
      <NavbarBackdrop
        onClick={toggle}
        onKeyDown={handleBackdropKeyDown}
        tabIndex={shown ? 0 : -1}
      />
      <NavbarMobileSidebar />
    </nav>
  );
};

const HideableNavbarLayout = ({
  children,
  style,
}: NavbarLayoutShellProps): JSX.Element => {
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
};

const StaticNavbarLayout = ({
  children,
  style,
}: NavbarLayoutShellProps): JSX.Element => {
  return (
    <NavbarShell hideOnScroll={false} style={style}>
      {children}
    </NavbarShell>
  );
};

NavbarBackdrop.displayName = "NavbarBackdrop";
NavbarShell.displayName = "NavbarShell";
HideableNavbarLayout.displayName = "HideableNavbarLayout";
StaticNavbarLayout.displayName = "StaticNavbarLayout";

const NavbarLayout = ({ children }: Props): JSX.Element => {
  const {
    navbar: { hideOnScroll, style },
  } = useThemeConfig();

  if (hideOnScroll) {
    return (
      <HideableNavbarLayout style={style}>{children}</HideableNavbarLayout>
    );
  }

  return <StaticNavbarLayout style={style}>{children}</StaticNavbarLayout>;
};

export default NavbarLayout;
