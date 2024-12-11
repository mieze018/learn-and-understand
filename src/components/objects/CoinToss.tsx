'use client';
import { useCoinToss } from '@/hooks/useCoinToss';
import { useState } from 'react';
import { H2, H3 } from '@/components/atoms/Headings';

import { Section1, Section2, Section3 } from '@/components/atoms/Sections';
import { NumberInput, Label } from '@/components/atoms/Forms';
export const CoinToss = () => {
  const [tossCount, setTossCount] = useState(1);
  const { probabilities, probabilitiesGreater } = useCoinToss({ tossCount });
  const percentColorClasses = (percent: number) => {
    if (percent >= 75) return 'text-blue-500';
    if (percent >= 50) return 'text-green-500';
    if (percent >= 25) return 'text-yellow-500';
    return 'text-red-500';
  };
  if (tossCount < 1) {
    return null;
  }
  return (
    <Section1>
      <H2>コイントスで表が出る回数と確率</H2>
      <Section2>
        <Section3>
          <Label>
            コイントスの回数：
            <NumberInput
              value={tossCount}
              onChange={(e) => setTossCount(Number(e.target.value))}
              min={1}
            />
          </Label>
        </Section3>
        <H3>表が出る回数と確率</H3>
        <div className="flex flex-row gap-2 items-center w-full">
          <ul className="flex flex-col gap-2 items-center w-full">
            {probabilities.map((p) => {
              return (
                <li key={p.count}>
                  {p.count}回 :{' '}
                  <span className={percentColorClasses(p.probability)}>
                    {p.probability}
                  </span>
                  %
                </li>
              );
            })}
          </ul>
          <ul className="flex flex-col gap-2 items-center w-full">
            {tossCount > 1 &&
              probabilitiesGreater.map((p) => {
                return (
                  <li key={p.count}>
                    {p.count}回
                    {p.count === 0 || p.count === tossCount ? '' : '以上'}:{' '}
                    <span className={percentColorClasses(p.probability)}>
                      {p.probability}%
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      </Section2>
    </Section1>
  );
};
