import { useState } from 'react';

/**
 * 連結リストを操作するためのカスタムフック
 * キーは配列番号ではなく、値がそのままキーとなる形。
 * 挿入・削除・移動・検索が行える。
 */
type Value = string;
type Node = {
  value: Value;
  next: Node | null;
};
export const useNestedLinkedList = () => {
  const [head, setHead] = useState<Node | null>(null);

  const insert = (value: Value) => {
    const newNode: Node = { value, next: head };
    setHead(newNode);
  };

  const remove = (value: Value) => {
    if (!head) return;
    if (head.value === value) {
      setHead(head.next);
      return;
    }

    let current = head;
    while (current.next) {
      if (current.next.value === value) {
        current.next = current.next.next;
        return;
      }
      current = current.next;
    }
  };

  const search = (value: Value) => {
    let current = head;
    while (current) {
      if (current.value === value) {
        return true;
      }
      current = current.next;
    }
    return false;
  };

  const move = (from: Value, to: Value) => {
    if (!head) return;
    if (from === to) return;

    let current = head;
    let fromNode: Node | null = null;
    let toNode: Node | null = null;
    while (current) {
      if (current.value === from) {
        fromNode = current;
      }
      if (current.value === to) {
        toNode = current;
      }
      current = current.next;
    }

    if (!fromNode || !toNode) return;

    remove(from);
    if (toNode.next) {
      fromNode.next = toNode.next;
    }
    toNode.next = fromNode;
  };

  return { head, insert, remove, search, move };
};

export type UseLinkedListType = ReturnType<typeof useNestedLinkedList>;
