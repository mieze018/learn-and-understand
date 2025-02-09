'use client';
import { useRandom2DigitMultiplication } from '@/hooks/useRandom2DigitMultiplication';
import { H2 } from '@/components/atoms/Headings';
import { Button, NumberInput } from '@/components/atoms/Forms';
import { Section1, Section2 } from '@/components/atoms/Sections';

export const Random2DigitMultiplication = () => {
  const {
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
  } = useRandom2DigitMultiplication();

  return (
    <Section1>
      <H2>ランダムな2桁の掛け算</H2>
      <Section2>
        <Button onClick={randomize}>生成</Button>
        {multiplicand} x {multiplier} =
        <NumberInput
          type="number"
          value={answer || ''}
          onChange={(e) => setAnswer(Number(e.target.value))}
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              checkAnswer();
            }
          }}
        />
      </Section2>
      <Section2>
        <Button onClick={checkAnswer}>答え合わせ</Button>
        {isCorrect && <span className="text-green-600">答え： {product}</span>}
        {isCorrect === false && (
          <span className="text-red-600">答え： {product}</span>
        )}
      </Section2>
      <Section2>
        <div>
          回答時間:
          <span className="inline-block text-right min-w-8">{timeTaken}</span>秒
        </div>
        <Button onClick={startTimer}>同じ問題で再度カウントダウン</Button>
      </Section2>
    </Section1>
  );
};
