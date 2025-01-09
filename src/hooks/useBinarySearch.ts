import { useState, useCallback } from 'react';

/**
 * 1からlengthまでの数値を二分探索で検索する。
 * 検索した回数と過程を返す。
 * 線形探索の場合の結果と比較も返す。
 */
export const useBinarySearch = () => {
  const [searchCount, setSearchCount] = useState<number>(0);
  const [process, setProcess] = useState<number[]>([]);
  const [linerSearchCount, setLinerSearchCount] = useState<number>(0);
  const [compare, setCompare] = useState<number>(0);

  const [isError, setIsError] = useState<boolean>(false);

  const [length, setLength] = useState<number>(100000000);
  const [target, setTarget] = useState<number>(999);

  const errorCheck = useCallback(() => {
    if (!length || !target) {
      setIsError(true);
      return;
    }
    if (length < target) {
      setIsError(true);
      return;
    }
    setIsError(false);
  }, [length, target, setIsError]);

  const binarySearch = useCallback(() => {
    setProcess([]);
    setSearchCount(0);
    if (isError) return;

    let left = 0;
    let right = length;
    let count = 0;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setProcess((prev) => [...prev, mid]);
      count++;
      if (mid === target) {
        setSearchCount(count);
        return;
      }
      if (mid < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    setSearchCount(count);
  }, [length, target, isError, setProcess, setSearchCount]);

  const linerSearch = useCallback(() => {
    if (target > length) {
      setLinerSearchCount(length);
    } else {
      setLinerSearchCount(target);
    }
  }, [length, target, setLinerSearchCount]);

  const compareResults = useCallback(() => {
    if (target && searchCount) {
      setCompare(Math.round(target / searchCount));
    }
  }, [target, searchCount, setCompare]);

  const search = useCallback(() => {
    errorCheck();
    binarySearch();
    linerSearch();
    compareResults();
  }, [binarySearch, linerSearch, compareResults, errorCheck]);

  const handleLengthChange = (value: string) => {
    setLength(parseInt(value, 10));
    search();
  };
  const handleTargetChange = (value: string) => {
    setTarget(parseInt(value, 10));
    search();
  };

  return {
    target,
    length,
    searchCount,
    process,
    linerSearchCount,
    compare,
    isError,
    handleLengthChange,
    handleTargetChange,
  };
};
