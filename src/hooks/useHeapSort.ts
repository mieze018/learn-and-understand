import { useState, useCallback } from 'react';
import { randomizeArrayUtil } from '../lib/randomizeArrayUtil';
/**ヒープソートを実現する */
export const useHeapSort = () => {
  const [array, setArray] = useState<number[]>([]);
  const [sortedArray, setSortedArray] = useState<number[]>([]);
  const [isSorted, setIsSorted] = useState(false);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [arraySize, setArraySize] = useState(10);
  const [isDescending, setIsDescending] = useState(false);

  const randomizeArray = useCallback(() => {
    const newArray = randomizeArrayUtil({ arraySize });
    setArray(newArray);
    setIsSorted(false);
  }, [arraySize]);

  const heapSort = useCallback((array: number[]): number[] => {
    const length = array.length;
    for (
      // 親ノードのインデックス
      let parentIndex = Math.floor(length / 2) - 1;
      parentIndex >= 0;
      parentIndex--
    ) {
      heapify(array, length, parentIndex);
    }
    // ヒープから要素を一つずつ取り出す
    for (let endIndex = length - 1; endIndex > 0; endIndex--) {
      [array[0], array[endIndex]] = [array[endIndex], array[0]];
      heapify(array, endIndex, 0);
    }
    return array;
  }, []);

  /** ヒープを構築する */
  const heapify = (array: number[], length: number, parentIndex: number) => {
    // 親ノードのインデックス
    let largest = parentIndex;
    const leftChild = 2 * parentIndex + 1;
    const rightChild = 2 * parentIndex + 2;
    // 左の子ノードが親ノードより大きい場合
    if (leftChild < length && array[leftChild] > array[largest]) {
      // 左の子ノードを最大値とする
      largest = leftChild;
    }
    // 右の子ノードが親ノードより大きい場合
    if (rightChild < length && array[rightChild] > array[largest]) {
      // 右の子ノードを最大値とする
      largest = rightChild;
    }
    // 親ノードが最大値でない場合
    if (largest !== parentIndex) {
      // 親ノードと最大値の子ノードを交換する
      [array[parentIndex], array[largest]] = [
        array[largest],
        array[parentIndex],
      ];
      // 再帰的にヒープを構築する
      heapify(array, length, largest);
    }
  };

  const sortArray = useCallback(() => {
    if (isSorting) return;
    setIsSorting(true);
    const start = performance.now();
    const sortedArray = heapSort(array);
    const end = performance.now();
    setSortedArray(sortedArray);
    setIsSorted(true);
    setIsSorting(false);
    console.log(`Heap sort took ${end - start} milliseconds`);
  }, [array, heapSort, isSorting]);

  return {
    array,
    sortedArray,
    isSorted,
    isSorting,
    speed,
    setSpeed,
    arraySize,
    setArraySize,
    isDescending,
    setIsDescending,
    randomizeArray,
    sortArray,
  };
};
