import { Button } from "@site/src/components/core/Button/Button";
import { Graph, GraphNode, SECTIONS_IDS } from "../graphDemo";

export const InitSection: React.FC<{
  setCurrentSection: React.Dispatch<
    React.SetStateAction<GraphNode | undefined>
  >;
  graph: Graph;
}> = ({ setCurrentSection, graph }) => {
  return (
    <section>
      <p>Test para evaluar tu ruta de aprendizaje</p>
      <Button
        label={"Empezar"}
        onClick={() =>
          setCurrentSection(graph.getNode(SECTIONS_IDS.PROGRAMMING))
        }
      />
    </section>
  );
};
