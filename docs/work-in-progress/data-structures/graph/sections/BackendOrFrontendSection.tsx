import { useState } from "react";
import { RadioButton } from "@site/src/components/core/RadioButton/RadioButton";
import { Graph, GraphNode, SECTIONS_IDS } from "../graphDemo";
import { Button } from "@site/src/components/core/Button/Button";

const BACKEND_ID = "backend";
const FRONTEND_ID = "frontend";

export const BackendOrFrontendSection: React.FC<{
  setCurrentSection: React.Dispatch<
    React.SetStateAction<GraphNode | undefined>
  >;
  graph: Graph;
}> = ({ setCurrentSection, graph }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section>
      <p>¿Prefieres el desarrollo Backend o Frontend?</p>
      <div className="margin-bottom--md">
        <RadioButton
          id={BACKEND_ID}
          name={"tech"}
          value={BACKEND_ID}
          label={"Backend"}
          checked={selected === BACKEND_ID}
          onChange={(event) => setSelected(event.target.value)}
        />
        <RadioButton
          id={FRONTEND_ID}
          name={"tech"}
          value={FRONTEND_ID}
          label={"Frontend"}
          checked={selected === FRONTEND_ID}
          onChange={(event) => setSelected(event.target.value)}
        />
      </div>
      <Button
        label={"Siguiente"}
        onClick={() => setCurrentSection(graph.getNode(SECTIONS_IDS.FINISHED))}
      />
    </section>
  );
};
