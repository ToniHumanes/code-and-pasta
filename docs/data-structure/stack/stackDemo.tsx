import { Button } from "@site/src/components/core/Button/Button";
import { useEffect, useState } from "react";

class Stack {
  private items: string[] = [];

  push(item: string): void {
    this.items.push(item);
  }

  pop(): string | undefined {
    return this.items.pop();
  }

  getItems(): string[] {
    return this.items;
  }

  peek(): string | undefined {
    return this.items[this.items.length - 1];
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items = [];
  }
}

export const StackDemo = () => {
  const [stack] = useState(new Stack());
  const [stackItems, setStackItems] = useState<string[]>([]);

  const addRoute = (route: string) => {
    if (stack.peek() === route) return;
    stack.push(route);
    setStackItems([...stack.getItems()]);
  };

  const removeRoute = () => {
    if (stack.isEmpty()) return;
    stack.pop();
    setStackItems([...stack.getItems()]);
  };

  const clearHistory = () => {
    if (stack.isEmpty()) return;
    stack.clear();
    setStackItems([]);
  };

  useEffect(() => {
    stack.clear();
    setStackItems([]);
  }, []);

  return (
    <section>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          display: "flex",
          gap: "1rem",
          width: "100%",
          alignItems: "baseline",
        }}
      >
        <Button
          label="Atrás"
          color="secondary"
          onClick={() => {
            removeRoute();
          }}
        />
        <Button
          label="Página de inicio"
          onClick={() => {
            addRoute("home");
          }}
        />
        <Button
          label="Página sobre nosotros"
          onClick={() => {
            addRoute("about");
          }}
        />
        <Button
          label="Página de contacto"
          onClick={() => {
            addRoute("contact");
          }}
        />
        <Button
          label="Borrar historial de navegación"
          color="secondary"
          onClick={() => {
            clearHistory();
          }}
        />
      </div>

      <p>Historial de navegación: {stackItems.join(" > ")}</p>
      <p>Página actual: {stack.peek() || "Ninguna"}</p>
      <p>Tamaño del stack: {stack.size()}</p>
      <p>¿El stack está vacío? {stack.isEmpty() ? "Sí" : "No"}</p>
    </section>
  );
};
