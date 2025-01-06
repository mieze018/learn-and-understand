import { useState, useEffect, useCallback } from 'react';
/**
 * 文字列をランレングス圧縮する
 * オプションで各圧縮の開始と終了に記号を付与する
 * カウント回数は16進数で表現する。
 * カウントが1の場合はカウントの表示を省略する。
 */
export const useRunLengthEncoding = () => {
  const [text, setText] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [result, setResult] = useState<string>('');
  const [startSymbol, setStartSymbol] = useState<string>('*');
  const [endSymbol, setEndSymbol] = useState<string>('#');
  const [isCountHex, setIsCountHex] = useState<boolean>(false);

  const runLengthEncoding = useCallback(
    (text: string) => {
      if (text === '') {
        setIsError(true);
        return;
      }

      setIsError(false);
      const encode = (str: string) => {
        let count = 1;
        let result = '';
        const resetCount = () => (count = 1);
        for (let i = 0; i < str.length; i++) {
          const isNextSame = str[i] === str[i + 1];
          if (isNextSame) {
            count++;
          } else if (count === 1) {
            result += `${startSymbol}${str[i]}${endSymbol}`;
          } else {
            const countStr = isCountHex ? count.toString(16) : count.toString();
            result += `${startSymbol}${str[i]}${countStr}${endSymbol}`;
            resetCount();
          }
        }
        return result;
      };

      setResult(encode(text));
    },
    [startSymbol, endSymbol, isCountHex],
  );

  useEffect(() => {
    runLengthEncoding(text);
  }, [text, runLengthEncoding]);

  return {
    result,
    isError,
    text,
    setText,
    startSymbol,
    setStartSymbol,
    endSymbol,
    setEndSymbol,
    isCountHex,
    setIsCountHex,
  };
};
