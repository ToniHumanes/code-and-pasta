import { useState } from "react";
import { RadioButton } from "@site/src/components/core/RadioButton/RadioButton";
import { Graph, GraphNode, SECTIONS_IDS } from "../graphDemo";
import { Button } from "@site/src/components/core/Button/Button";

const PROGRAMMING_YES_ID = "programming_yes";
const PROGRAMMING_NO_ID = "programming_no";

export const ProgrammingSection: React.FC<{
  setCurrentSection: React.Dispatch<
    React.SetStateAction<GraphNode | undefined>
  >;
  graph: Graph;
}> = ({ setCurrentSection, graph }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section>
      <p>¿Te gusta la programación?</p>
      <div className="margin-bottom--md">
        <RadioButton
          id={PROGRAMMING_YES_ID}
          name={"question"}
          value={PROGRAMMING_YES_ID}
          label={"Sí"}
          checked={selected === PROGRAMMING_YES_ID}
          onChange={(event) => setSelected(event.target.value)}
        />
        <RadioButton
          id={PROGRAMMING_NO_ID}
          name={"question"}
          value={PROGRAMMING_NO_ID}
          label={"No"}
          checked={selected === PROGRAMMING_NO_ID}
          onChange={(event) => setSelected(event.target.value)}
        />
      </div>
      <Button
        label={"Siguiente"}
        onClick={() =>
          setCurrentSection(
            graph.getNode(
              selected === PROGRAMMING_YES_ID
                ? SECTIONS_IDS.BACKEND_OR_FRONTEND
                : SECTIONS_IDS.WHAT_DO_YOU_LIKE
            )
          )
        }
      />
    </section>
  );
};
