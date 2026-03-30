import { Card } from "@site/src/components/core/Card/Card";
import { useState } from "react";

import ctanganaImage from "./img/ctangana.jpg";
import evanescenceImage from "./img/evanescence.jpg";
import bringMeTheHorizonImage from "./img/bring-me-the-horizon.webp";
import { ButtonGroup } from "@site/src/components/core/ButtonGroup/ButtonGroup";
import { Button } from "@site/src/components/core/Button/Button";

type NodeValue = {
  id: number;
  title: string;
  content: string;
  image: string;
};

const data: NodeValue[] = [
  {
    id: 1,
    title: "Bring Me The Horizon",
    content: "Avalanche",
    image: bringMeTheHorizonImage,
  },
  {
    id: 2,
    title: "Evanescence",
    content: "bring me to life",
    image: evanescenceImage,
  },
  {
    id: 3,
    title: "C.Tangana",
    content: "No te pegas",
    image: ctanganaImage,
  },
];

class Node {
  value: NodeValue;
  next: Node | null;
  prev: Node | null;

  constructor(value: NodeValue) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  head: Node | null;
  tail: Node | null;
  length: number;
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  add(value: NodeValue): void {
    this.length++;
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
  }

  delete(value: NodeValue): void {
    if (!this.head) return;

    let current: Node | null = this.head;

    while (current) {
      if (current.value.id === value.id) {
        if (current.prev) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }

        if (current.next) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }

        this.length--;
        return;
      }
      current = current.next;
    }
  }

  clear() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}

export const DoublyLinkedListDemo = () => {
  const emptyText = "No hay canciones en la lista.";
  const [list] = useState<DoublyLinkedList>(() => {
    const newList = new DoublyLinkedList();
    data.forEach((item) => newList.add(item));
    return newList;
  });

  const [currentNode, setCurrentNode] = useState<Node | null>(list.head);

  const nextSong = () => {
    if (currentNode?.next) {
      setCurrentNode(currentNode.next);
    }
  };

  const previousSong = () => {
    if (currentNode?.prev) {
      setCurrentNode(currentNode.prev);
    }
  };

  const deleteSong = () => {
    if (currentNode) {
      const nextOrPrev = currentNode.next || currentNode.prev;
      list.delete(currentNode.value);
      setCurrentNode(nextOrPrev);
    }
  };

  return (
    <section>
      <div style={{ width: "100%", maxWidth: "300px" }}>
        {currentNode ? (
          <Card
            title={currentNode.value.title}
            content={currentNode.value.content}
            image={currentNode.value.image}
          />
        ) : (
          <p>{emptyText}</p>
        )}
      </div>
      <ButtonGroup>
        <Button
          label={`Anterior: ${
            currentNode?.prev ? currentNode.prev.value.title : emptyText
          }`}
          onClick={previousSong}
        />
        <Button
          label={`Siguiente: ${
            currentNode?.next ? currentNode.next.value.title : emptyText
          }`}
          onClick={nextSong}
        />
        <Button
          color="secondary"
          label={"Eliminar canción"}
          onClick={deleteSong}
        />
      </ButtonGroup>
    </section>
  );
};
