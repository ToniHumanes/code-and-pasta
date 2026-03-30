import { Button } from "@site/src/components/core/Button/Button";
import { Graph, GraphNode, SECTIONS_IDS } from "../graphDemo";

export const FinishedSection: React.FC<{
  setCurrentSection: React.Dispatch<
    React.SetStateAction<GraphNode | undefined>
  >;
  graph: Graph;
}> = ({ setCurrentSection, graph }) => {
  return (
    <section>
      <p>
        ¡Has completado el test, evaluaremos tus respuestas para establecer una
        ruta de aprendizaje!
      </p>
      <Button
        label={"Reiniciar"}
        color="secondary"
        onClick={() => setCurrentSection(graph.getNode(SECTIONS_IDS.START))}
      />
    </section>
  );
};
