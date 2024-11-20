import { useState } from 'react';

/**
 * 連結リストを扱うためのカスタムフック
 * 挿入・削除が行える
 */

export const useLinkedList = <T>() => {
  const [head, setHead] = useState<Node<T> | null>(null);

  const append = (value: T) => {
    const newNode: Node<T> = { value, next: null };
    if (!head) {
      setHead(newNode);
    } else {
      let current = head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
      setHead({ ...head });
    }
  };

  const remove = (value: T) => {
    if (!head) return;
    if (head.value === value) {
      setHead(head.next);
      return;
    }
    let current = head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    if (current.next) {
      current.next = current.next.next;
      setHead({ ...head });
    }
  };

  // const render = () => {
  // 	const nodes = [];
  // 	let current = head;
  // 	while (current) {
  // 		nodes.push(<div key={current.value.toString()}>{current.value}</div>);
  // 		current = current.next;
  // 	}
  // 	return <div>{nodes}</div>;
  // };

  return { append, remove };
};
