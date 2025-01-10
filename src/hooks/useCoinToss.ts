import { useState, useMemo, useCallback } from 'react';
/**コイントスで表が出る回数と確率
 * n回投げて表が出る回数の各確率およびn回連続で表が出る確率を計算する
 */
export const useCoinToss = () => {
  /**コイントス回数 */
  const [tossCount, setTossCount] = useState(1);
  /** %の小数以下の桁数 */
  const [decimalPlaces, setDecimalPlaces] = useState(3);
  /**コイントス回数の選択肢 */
  const tossCountSelection = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  ];
  const percentColorClasses = (percent: number) => {
    if (percent >= 90) return 'text-blue-500';
    if (percent >= 75) return 'text-cyan-500';
    if (percent >= 50) return 'text-green-500';
    if (percent >= 25) return 'text-yellow-500';
    if (percent >= 10) return 'text-orange-500';
    return 'text-red-500';
  };
  /** toCountまでの各回数の配列 */
  const eachCount = Array.from({ length: tossCount + 1 });
  /** 数値をパーセントに変換 */
  const toPercent = useCallback(
    (num: number) =>
      Math.round(num * 10 ** decimalPlaces * 100) / 10 ** decimalPlaces,
    [decimalPlaces],
  );
  /** 階乗 */
  const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
  /** 組み合わせ */
  const combination = (tossCount: number, count: number): number => {
    const numerator = factorial(tossCount);
    const denominator = factorial(count) * factorial(tossCount - count);
    return numerator / denominator;
  };

  /**各回数の確率 */
  const probabilities = eachCount.map((_, countIndex) => {
    const combinationValue = combination(tossCount, countIndex);
    const probabilityOfHeads = 0.5 ** countIndex;
    const probabilityOfTails = 0.5 ** (tossCount - countIndex);
    const probability =
      combinationValue * probabilityOfHeads * probabilityOfTails;
    return { count: countIndex, probability: toPercent(probability) };
  });

  /**n回以上の確率 */
  const probabilitiesGreater = eachCount.map((_, i) => {
    const count = i;
    // count以上の表が出る確率
    if (count === 0)
      return { count, probability: probabilities[0].probability };

    const probability =
      probabilities
        .filter((p) => p.count >= count)
        .reduce((acc, cur) => acc + cur.probability, 0) / 100;
    return { count, probability: toPercent(probability) };
  });

  /** n回連続で表が出る確率 */
  const probabilitiesConsecutive = useMemo(() => {
    const probability = 0.5 ** tossCount;
    return { count: tossCount, probability: toPercent(probability) };
  }, [tossCount, toPercent]);
  /** パターン数 */
  const patternCount = 2 ** tossCount;

  return {
    probabilities,
    probabilitiesGreater,
    probabilitiesConsecutive,
    tossCountSelection,
    tossCount,
    setTossCount,
    percentColorClasses,
    patternCount,
    decimalPlaces,
    setDecimalPlaces,
  };
};
