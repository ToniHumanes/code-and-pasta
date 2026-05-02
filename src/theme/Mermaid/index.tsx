import BrowserOnly from "@docusaurus/BrowserOnly";
import OriginalMermaid from "@theme-original/Mermaid";
import type { ComponentProps, JSX } from "react";

type MermaidProps = ComponentProps<typeof OriginalMermaid>;

export default function Mermaid(props: MermaidProps): JSX.Element {
  return (
    <BrowserOnly
      fallback={
        <div className="mermaid mermaid--loading" aria-busy="true">
          Cargando diagrama...
        </div>
      }
    >
      {() => <OriginalMermaid {...props} />}
    </BrowserOnly>
  );
}
