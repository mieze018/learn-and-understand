import { useState } from 'react';
/**
 * pop, pushなどのスタック操作を覚えるためのカスタムフック
 */
export const useStack = () => {
  const [stack, setStack] = useState<number[]>([]);
  const [value, setValue] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);

  const push = () => {
    if (value === 0) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setStack([...stack, value]);
    setValue(0);
  };

  const pop = () => {
    if (stack.length === 0) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setStack(stack.slice(0, stack.length - 1));
  };

  return {
    stack,
    value,
    setValue,
    isError,
    push,
    pop,
  };
};
