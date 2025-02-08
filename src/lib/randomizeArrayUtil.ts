/**
 * 数値の配列をランダムに生成する
 */
export const randomizeArrayUtil = ({
  arraySize,
  min = 0,
  max = 100,
}: {
  arraySize: number;
  min?: number;
  max?: number;
}): number[] => {
  const newArray = Array.from({ length: arraySize }, () =>
    Math.floor(Math.random() * (max - min + 1) + min),
  );
  return newArray;
};
