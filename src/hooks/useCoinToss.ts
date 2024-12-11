/**コイントスで表が出る回数と確率 */
export const useCoinToss = ({ tossCount }: { tossCount: number }) => {
  /** toSSCountまでの書く回数の配列 */
  const eachCount = Array.from({ length: tossCount + 1 });
  /** 数値をパーセントに変換 */
  const toPercent = (num: number) => Math.round(num * 100 * 100) / 100;
  /** 階乗 */
  const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
  /** 組み合わせ */
  const combination = (tossCount: number, count: number): number => {
    const numerator = factorial(tossCount);
    const denominator = factorial(count) * factorial(tossCount - count);
    return numerator / denominator;
  };

  const probabilities = eachCount.map((_, i) => {
    const count = i;
    const combinationValue = combination(tossCount, count);
    const probabilityOfHeads = 0.5 ** count;
    const probabilityOfTails = 0.5 ** (tossCount - count);
    const probability =
      combinationValue * probabilityOfHeads * probabilityOfTails;
    return { count, probability: toPercent(probability) };
  });

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

  return { probabilities, probabilitiesGreater };
};
