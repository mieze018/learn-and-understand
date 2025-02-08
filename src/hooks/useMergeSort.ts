import { useState, useCallback } from 'react';
import { randomizeArrayUtil } from '../lib/randomizeArrayUtil';
/**マージソートを実現する */
export const useMergeSort = () => {
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

  /** 与えられた配列を2つに分割する */
  const splitArray = (array: number[]): [number[], number[]] => {
    const middle = Math.floor(array.length / 2);
    return [array.slice(0, middle), array.slice(middle)];
  };

  /** マージソートを実行する */
  const mergeSort = useCallback((array: number[]): number[] => {
    if (array.length <= 1) return array;
    const [left, right] = splitArray(array);
    return merge(mergeSort(left), mergeSort(right));
  }, []);

  /** 2つの配列をマージする */
  const merge = (left: number[], right: number[]): number[] => {
    let i = 0;
    let j = 0;
    const mergedArray: number[] = [];
    // 左右の配列を比較して小さい方をマージする
    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        mergedArray.push(left[i]);
        i++;
      } else {
        mergedArray.push(right[j]);
        j++;
      }
    }
    // 残りの要素をマージする
    return mergedArray.concat(left.slice(i)).concat(right.slice(j));
  };

  const sortArray = useCallback(() => {
    if (isSorting) return;
    setIsSorting(true);
    const start = performance.now();
    const sortedArray = mergeSort(array);
    const end = performance.now();
    setSortedArray(sortedArray);
    setIsSorted(true);
    setIsSorting(false);
    console.log(`Merge sort took ${end - start} milliseconds`);
  }, [array, mergeSort, isSorting]);

  return {
    array,
    setArray,
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
