import { Button } from "@site/src/components/base/Button";
import { ActionGroup } from "@site/src/components/base/ActionGroup";
import { Tag } from "@site/src/components/base/Tag";
import { useCallback, useState } from "react";

class Queue<T> {
  private items: T[] = [];

  enqueue(element: T): void {
    this.items.push(element);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  getItems(): T[] {
    return this.items;
  }
}

export const QueueDemo = () => {
  const [queue] = useState(new Queue<string>());
  const [queueItems, setQueueItems] = useState<string[]>([]);

  const removeQueueItem = useCallback(() => {
    if (queue.isEmpty()) return;
    queue.dequeue();
    setQueueItems([...queue.getItems()]);
  }, [queue]);

  const addQueueItem = () => {
    queue.enqueue(new Date().getTime().toString());
    setQueueItems([...queue.getItems()]);
  };

  return (
    <>
      <ActionGroup>
        <Button
          label="Crear notificación en cola"
          onClick={() => {
            addQueueItem();
          }}
        />

        <Button
          color="secondary"
          label="Borrar notificación en cola"
          onClick={() => {
            removeQueueItem();
          }}
        />
      </ActionGroup>

      <section style={{ marginTop: "8px" }}>
        <p>Primera notificación (actual) en la cola: {queue.peek()}</p>
        <p>Número de Notificaciones en la cola: {queue.size()}</p>
        <p>Notificaciones:</p>
        {queueItems.map((item: string) => (
          <div key={item} style={{ marginBottom: "8px" }}>
            <Tag color="yellow" text={`Nueva notificación con id: ${item}`} />
          </div>
        ))}
      </section>
    </>
  );
};
