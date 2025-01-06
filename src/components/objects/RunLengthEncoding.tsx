'use client';
import { useRunLengthEncoding } from '@/hooks/useRunLengthEncoding';

import { H2 } from '@/components/atoms/Headings';
import {
  TextInput,
  Checkbox,
  LabelWrapper,
  LabelSpan,
} from '@/components/atoms/Forms';
import { Section1, Section2, Section3 } from '@/components/atoms/Sections';

export const RunLengthEncoding = () => {
  const {
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
  } = useRunLengthEncoding();

  return (
    <Section1>
      <H2>ランレングス圧縮</H2>
      <Section2>
        <Section3>
          <TextInput
            placeholder="文字列を入力"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="max-w-full w-full"
          />
        </Section3>
        <Section3>
          Option: <br />
          <TextInput
            placeholder="開始記号"
            value={startSymbol}
            onChange={(e) => setStartSymbol(e.target.value)}
          />
          <TextInput
            placeholder="終了記号"
            value={endSymbol}
            onChange={(e) => setEndSymbol(e.target.value)}
          />
          <LabelWrapper>
            <LabelSpan>カウントを16進数で表現する</LabelSpan>

            <Checkbox
              checked={isCountHex}
              onChange={() => setIsCountHex(!isCountHex)}
            />
          </LabelWrapper>
        </Section3>
        <Section3 className="break-all">元のテキスト: {text}</Section3>
        <Section3>
          符号化結果: {isError ? '文字列を入力してください' : result}
        </Section3>
      </Section2>
    </Section1>
  );
};
