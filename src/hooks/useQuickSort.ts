import { useState, useCallback } from 'react';
import { randomizeArrayUtil } from '../lib/randomizeArrayUtil';
/**クイックソートを実現する */
export const useQuickSort = () => {
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

  const quickSort = useCallback((array: number[]): number[] => {
    if (array.length <= 1) return array;
    // 配列の先頭をピボット(分割の基準値)とする
    const pivot = array[0];
    const left = [];
    const right = [];
    // ピボットより小さい要素をleftに、大きい要素をrightに分割する
    for (let i = 1; i < array.length; i++) {
      if (array[i] < pivot) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }
    // leftとrightを再帰的にソートして結合する
    return quickSort(left).concat(pivot, quickSort(right));
  }, []);

  const sortArray = useCallback(() => {
    if (isSorting) return;
    setIsSorting(true);
    const start = performance.now();
    const sortedArray = quickSort(array);
    const end = performance.now();
    setSortedArray(sortedArray);
    setIsSorted(true);
    setIsSorting(false);
    console.log(`Quick sort took ${end - start} milliseconds`);
  }, [array, quickSort, isSorting]);

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
