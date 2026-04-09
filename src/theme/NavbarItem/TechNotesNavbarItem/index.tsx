import type { ReactNode } from "react";
import { useActiveDocContext, useLayoutDocsSidebar } from "@docusaurus/plugin-content-docs/client";
import { useLocation } from "@docusaurus/router";
import useIsBrowser from "@docusaurus/useIsBrowser";
import DefaultNavbarItem from "@theme/NavbarItem/DefaultNavbarItem";
import type { Props as DefaultNavbarItemProps } from "@theme/NavbarItem/DefaultNavbarItem";

interface Props extends DefaultNavbarItemProps {
  readonly sidebarId: string;
  readonly docsPluginId?: string;
}

export default function TechNotesNavbarItem({
  sidebarId,
  label,
  docsPluginId,
  ...props
}: Props): ReactNode {
  const isBrowser = useIsBrowser();
  const { search } = useLocation();
  const { activeDoc } = useActiveDocContext(docsPluginId);
  const sidebarLink = useLayoutDocsSidebar(sidebarId, docsPluginId).link;

  if (!sidebarLink) {
    throw new Error(
      `TechNotesNavbarItem: Sidebar with ID "${sidebarId}" doesn't have anything to be linked to.`,
    );
  }

  if (!isBrowser || new URLSearchParams(search).get("notes") !== "true") {
    return null;
  }

  return (
    <DefaultNavbarItem
      exact
      {...props}
      isActive={() => activeDoc?.sidebar === sidebarId}
      label={label ?? sidebarLink.label}
      to={`${sidebarLink.path}?notes=true`}
    />
  );
}
