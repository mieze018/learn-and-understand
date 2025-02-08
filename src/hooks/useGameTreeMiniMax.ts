import { useState } from 'react';

export const useGameTreeMiniMax = () => {
  const [tree, setTree] = useState<number[][]>([[]]);
  const [depth, setDepth] = useState<number>(1);
  const [result, setResult] = useState<number>(0);

  const createTree = (depth: number) => {
    const tree: number[][] = [];
    const createNode = (depth: number, node: number) => {
      if (depth === 0) {
        return;
      }
      tree[node] = [];
      tree[node].push(node * 2);
      tree[node].push(node * 2 + 1);
      createNode(depth - 1, node * 2);
      createNode(depth - 1, node * 2 + 1);
    };
    createNode(depth, 1);
    setTree(tree);
  };

  const calcResult = (depth: number) => {
    const calcNode = (node: number, depth: number): number => {
      if (depth === 0) {
        return node;
      }
      if (depth % 2 === 0) {
        return Math.max(
          calcNode(node * 2, depth - 1),
          calcNode(node * 2 + 1, depth - 1),
        );
      } else {
        return Math.min(
          calcNode(node * 2, depth - 1),
          calcNode(node * 2 + 1, depth - 1),
        );
      }
    };
    setResult(calcNode(1, depth));
  };

  return { tree, depth, result, setDepth, createTree, calcResult };
};
