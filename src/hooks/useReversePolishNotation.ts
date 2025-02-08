/**
 * 4.13 逆ポーランド記法を計算するカスタムフック
 * 四則演算に対応
 * スタックと相性がいいので問題に出てくるのであろう
 */

import { useState } from 'react';
export const useReversePolishNotation = () => {
  const [stack, setStack] = useState<number[]>([]);
  const [value, setValue] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const push = () => {
    if (value === '') {
      setIsError(true);
      return;
    }
    setIsError(false);
    setStack([...stack, Number(value)]);
    setValue('');
  };

  const pop = () => {
    if (stack.length === 0) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setStack(stack.slice(0, stack.length - 1));
  };

  const calculate = () => {
    if (stack.length < 2) {
      setIsError(true);
      return;
    }
    setIsError(false);
    const [num1, num2, ...rest] = stack;
    let result = 0;
    switch (value) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num1 / num2;
        break;
      default:
        setIsError(true);
        return;
    }
    setStack([result, ...rest]);
    setValue('');
  };

  return {
    stack,
    value,
    setValue,
    isError,
    push,
    pop,
    calculate,
  };
};
