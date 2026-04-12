import { JSX, useState } from "react";
import { BackendOrFrontendSection } from "./sections/BackendOrFrontendSection";
import { FinishedSection } from "./sections/FinishedSection";
import { InitSection } from "./sections/InitSection";
import { ProgrammingSection } from "./sections/ProgrammingSection";
import { WhatDoYouLikeSection } from "./sections/WhatDoYouLikeSection";

type NodeId = string;

type SectionComponent = React.FC<{
  setCurrentSection: React.Dispatch<
    React.SetStateAction<GraphNode | undefined>
  >;
  graph: Graph;
}>;

export const SECTIONS_IDS = {
  START: "start",
  PROGRAMMING: "programming",
  BACKEND_OR_FRONTEND: "backend_or_frontend",
  WHAT_DO_YOU_LIKE: "what_do_you_like",
  FINISHED: "finished",
} as const;

const [START, PROGRAMMING, BACKEND_OR_FRONTEND, WHAT_DO_YOU_LIKE, FINISHED] =
  Object.values(SECTIONS_IDS);

export class GraphNode {
  id: NodeId;
  component: SectionComponent;
  edges: Set<NodeId>;

  constructor(id: NodeId, component: SectionComponent) {
    this.id = id;
    this.component = component;
    this.edges = new Set();
  }

  addEdge(toId: NodeId) {
    this.edges.add(toId);
  }
}

export class Graph {
  nodes: Map<NodeId, GraphNode>;

  constructor() {
    this.nodes = new Map();
  }

  addNode(id: NodeId, component: SectionComponent) {
    const newNode = new GraphNode(id, component);
    this.nodes.set(id, newNode);
    return newNode;
  }

  addEdge(fromId: NodeId, toId: NodeId) {
    const startNode = this.nodes.get(fromId);
    const endNode = this.nodes.get(toId);
    if (startNode && endNode) {
      startNode.addEdge(toId);
    }
  }

  getNode(id: NodeId) {
    return this.nodes.get(id);
  }
}

export const GraphDemo = () => {
  const [graph] = useState<Graph>(() => {
    const innerGraph = new Graph();

    innerGraph.addNode(START, InitSection);
    innerGraph.addNode(PROGRAMMING, ProgrammingSection);
    innerGraph.addNode(BACKEND_OR_FRONTEND, BackendOrFrontendSection);
    innerGraph.addNode(WHAT_DO_YOU_LIKE, WhatDoYouLikeSection);
    innerGraph.addNode(FINISHED, FinishedSection);

    innerGraph.addEdge(START, PROGRAMMING);
    innerGraph.addEdge(PROGRAMMING, BACKEND_OR_FRONTEND);
    innerGraph.addEdge(PROGRAMMING, WHAT_DO_YOU_LIKE);
    innerGraph.addEdge(BACKEND_OR_FRONTEND, FINISHED);
    innerGraph.addEdge(WHAT_DO_YOU_LIKE, FINISHED);
    return innerGraph;
  });

  const [currentSection, setCurrentSection] = useState<GraphNode>(
    graph.nodes.get(START)
  );

  const CurrentSection = (): JSX.Element => {
    if (!currentSection) return <></>;
    const SectionComponent = currentSection.component;
    return (
      <SectionComponent setCurrentSection={setCurrentSection} graph={graph} />
    );
  };

  return (
    <>
      <CurrentSection />
    </>
  );
};
