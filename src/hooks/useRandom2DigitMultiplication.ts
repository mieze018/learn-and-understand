'use client';
import { useState, useEffect, useRef } from 'react';

/**ランダムな2桁の掛け算
 * 生成後に回答時間をカウントアップする
 */
export const useRandom2DigitMultiplication = () => {
  const [multiplicand, setMultiplicand] = useState(0);
  const [multiplier, setMultiplier] = useState(0);
  const [product, setProduct] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [answer, setAnswer] = useState<number | string>('');
  const [timeTaken, setTimeTaken] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  /** タイマーの参照 */
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /** ランダムな2桁の数値を生成 */
  const randomize2digit = () => Math.floor(Math.random() * 90) + 10;

  /** タイマーをクリア */
  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  /** タイマーを開始 5分後に自動停止   */
  const startTimer = () => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setTimeTaken((prev) => {
        if (prev > 300) return prev;
        return prev + 1;
      });
    }, 1000);
  };

  /** ランダム掛け算を生成 */
  const randomize = () => {
    const multiplicand = randomize2digit();
    const multiplier = randomize2digit();
    setMultiplicand(multiplicand);
    setMultiplier(multiplier);
    setProduct(multiplicand * multiplier);
    setAnswer('');
    setIsCorrect(null);
    setTimeTaken(0);
    inputRef.current?.focus();
    startTimer();
  };

  /**回答をチェック */
  const checkAnswer = () => {
    if (!answer) return;
    if (Number(answer) === product) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(
    /**ロード時に初期化 */
    () => {
      randomize();
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    multiplicand,
    multiplier,
    product,
    isCorrect,
    randomize,
    checkAnswer,
    answer,
    setAnswer,
    inputRef,
    timeTaken,
    startTimer,
  };
};
