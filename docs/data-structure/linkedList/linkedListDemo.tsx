import { Button } from "@site/src/components/core/Button/Button";
import { ButtonGroup } from "@site/src/components/core/ButtonGroup/ButtonGroup";
import { Input } from "@site/src/components/core/Input/Input";
import { JSX, useCallback, useState } from "react";

type NodeValue = string;
const initialValues: NodeValue[] = ["A", "B", "C"];

class Node {
  data: NodeValue;
  next: Node | null;

  constructor(data: NodeValue) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  head: Node | null;
  tail: Node | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value: NodeValue): void {
    const node: Node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
  }

  delete(value: NodeValue): void {
    if (this.head?.data === value) {
      this.head = this.head.next;
      if (!this.head) {
        this.tail = null;
      }
      return;
    }

    let current: Node | null = this.head;
    while (current?.next) {
      if (current.next.data === value) {
        current.next = current.next.next;
        if (!current.next) {
          this.tail = current;
        }
        break;
      }
      current = current.next;
    }
  }

  size(): number {
    let count = 0;
    let current = this.head;
    while (current) {
      count++;
      current = current.next;
    }
    return count;
  }

  toArray(): NodeValue[] {
    const result: NodeValue[] = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
  }
}

export const LinkedListDemo = () => {
  const [linkedList] = useState(() => {
    const list = new LinkedList();
    initialValues.forEach((value) => list.add(value));
    return list;
  });

  const [view, setView] = useState<NodeValue[]>(linkedList.toArray());
  const [input, setInput] = useState("");

  const handleAdd = useCallback(() => {
    if (input.trim() === "") return;
    if (linkedList.toArray().includes(input)) return;

    linkedList.add(input);
    setView(linkedList.toArray());
    setInput("");
  }, [input, linkedList]);

  const handleDelete = useCallback(
    (value: NodeValue) => {
      linkedList.delete(value);
      setView(linkedList.toArray());
    },
    [linkedList]
  );

  const handleClear = useCallback(() => {
    linkedList.clear();
    setView([]);
  }, [linkedList]);

  const renderList = (): JSX.Element => {
    if (view.length === 0) {
      return <p>La lista está vacía. Agrega un elemento.</p>;
    }

    return (
      <section>
        <p>
          <strong>Estructura de la lista:</strong>
        </p>
        <p>
          {view.map((value: string, index: number) => (
            <span key={index}>
              Node({value}) {index < view.length - 1 ? "→ " : "→ null"}
            </span>
          ))}
        </p>
        <p>
          <strong>Tamaño:</strong> {linkedList.size()}
        </p>
      </section>
    );
  };

  return (
    <section>
      <div className="margin-bottom--md">
        <p>Agregar nodo:</p>
        <Input
          name="input"
          type="text"
          className="margin-bottom--md"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un valor (ej: D)"
        />
        <Button label="Agregar" onClick={handleAdd} />
      </div>

      <div>{renderList()}</div>

      <div className="margin--xs">
        <p>
          <strong>Eliminar nodo:</strong>
        </p>
        <ButtonGroup>
          {view.map((value) => (
            <Button
              key={value}
              label={`Eliminar ${value}`}
              color="secondary"
              onClick={() => handleDelete(value)}
            />
          ))}
          {view.length > 0 && (
            <Button
              label="Limpiar lista"
              color="secondary"
              onClick={handleClear}
            />
          )}
        </ButtonGroup>
      </div>
    </section>
  );
};
