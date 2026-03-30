import { FC, Dispatch, useState } from "react";
import { Button } from "@site/src/components/core/Button/Button";
import { RadioButton } from "@site/src/components/core/RadioButton/RadioButton";
import { Graph, GraphNode, SECTIONS_IDS } from "../graphDemo";

const DESIGN_ID = "design";
const PRODUCT_MANAGEMENT_ID = "product-management";
const TESTING_ID = "testing";

export const WhatDoYouLikeSection: FC<{
  setCurrentSection: Dispatch<React.SetStateAction<GraphNode | undefined>>;
  graph: Graph;
}> = ({ setCurrentSection, graph }) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section>
      <p>Si no te gusta la programación ¿Qué te gusta hacer?</p>
      <div className="margin-bottom--md">
        <RadioButton
          id={PRODUCT_MANAGEMENT_ID}
          name={"like"}
          value={PRODUCT_MANAGEMENT_ID}
          checked={selected === PRODUCT_MANAGEMENT_ID}
          label={"Gestión de Producto"}
          onChange={(event) => setSelected(event.target.value)}
        />
        <RadioButton
          id={DESIGN_ID}
          name={"like"}
          value={DESIGN_ID}
          checked={selected === DESIGN_ID}
          label={"Diseñar"}
          onChange={(event) => setSelected(event.target.value)}
        />
        <RadioButton
          id={TESTING_ID}
          name={"like"}
          value={TESTING_ID}
          checked={selected === TESTING_ID}
          label={"Testear"}
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
