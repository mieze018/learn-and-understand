import { useState, useCallback, useMemo } from 'react';

/**
 * 4.8 ハッシュ法
 * 問題文を読んでも意味が全然わからなかったが解説見たら意味がわかった
 */

export const useHashingMethod = () => {
  const initHashTable = (max: number) => {
    return new Array(max).fill(0).map(() => new Array(2).fill(0));
  };

  const [maxHashNumber, setMaxHashNumber] = useState<number>(5);
  /** 2列15行の2次元テーブル */
  const [hashTable, setHashTable] = useState<number[][]>(
    initHashTable(maxHashNumber),
  );
  const [value, setValue] = useState<string>('4,12,17,18,22');
  const [isError, setIsError] = useState<boolean>(false);

  /**
   * ハッシュ関数
   */
  const hashFunction = (value: number, maxHashNumber: number) => {
    return (value % maxHashNumber) + 1;
  };

  const valueArray = useMemo(() => {
    if (!value) return [];
    return value.split(',').map((v) => parseInt(v));
  }, [value]);

  const resetTable = useCallback(
    () => setHashTable(initHashTable(maxHashNumber)),
    [maxHashNumber],
  );

  /**
   * 手続hashingは、引数として与えられた整数型の配列dataに格納されている正の整数データを、ハッシュ法を用いてテーブルに登録する手続である。
   * ハッシュ法では、ハッシュ関数と呼ぶ計算式を用いて、対象データを限定された範囲の値（ハッシュ値）に変換し、この値を利用してテーブル上の格納位置を決定する。ここではハッシュ関数として、次の式を用いる。
   * ハッシュ値 = 整数データ値を5で割った余り + 1
   * また、異なるデータのハッシュ値が等しくなる場合の解決方法として、ハッシュ値が等しいデータ同士をチェーンで繋ぐ方式を用いる。
   * テーブルは、整数型の二次元配列hashTableで構成される。
   * 各行の1列目の要素に整数データを、2列目の要素にチェーン（後続データを格納した場所の行番号）を格納する。
   * hashTableの1行目から5行目までは、ハッシュ値が等しい最初の整数データを格納する。
   * ハッシュ値が等しい2個目以降の後続データは、その発生順に6行目以降に格納する。
   */
  const hashing = () => {
    resetTable();
    if (valueArray.some((v) => v <= 0)) {
      setIsError(true);
      return;
    }

    setHashTable((prev) => {
      const newHashTable = [...prev];
      let chainedNextIndex = maxHashNumber + 1;
      valueArray.forEach((val) => {
        /** チェーンの最後のインデックス。 */
        /** 1~maxHashNumberの範囲の値 */
        const hashValue = hashFunction(val, maxHashNumber);
        console.log('hashValue', val, hashValue);
        // 配列のインデックスは0から始まるので-1する
        const isFirstHashValue = newHashTable[hashValue - 1][0] === 0;
        if (isFirstHashValue) {
          newHashTable[hashValue - 1] = [val, 0];
        } else {
          newHashTable[chainedNextIndex - 1] = [val, 0];
          // 2列目が空の同ハッシュ値の行を探して、そこにindexを入れる。
          // ハッシュ値の位置からまず見て、2列目がにすでに値が入っていれば、次はその値の位置を見る。を繰り返す。
          let current = hashValue;
          while (newHashTable[current - 1][1] !== 0) {
            current = newHashTable[current - 1][1];
          }
          newHashTable[current - 1][1] = chainedNextIndex;

          chainedNextIndex++;
        }
      });
      return newHashTable;
    });
  };

  return {
    maxHashNumber,
    setMaxHashNumber,
    hashTable,
    value,
    setValue,
    isError,
    hashing,
    valueArray,
  };
};
