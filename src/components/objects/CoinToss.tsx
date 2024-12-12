'use client';
import { useCoinToss } from '@/hooks/useCoinToss';
import { useState, Fragment } from 'react';
import { H2, H3 } from '@/components/atoms/Headings';
import { DlCol, Dd, Dt } from '@/components/atoms/DescriptionList';

import { Section1, Section2, Section3 } from '@/components/atoms/Sections';
import { Label } from '@/components/atoms/Forms';
export const CoinToss = () => {
  const [tossCount, setTossCount] = useState(1);
  const tossCountSelection = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const { probabilities, probabilitiesGreater } = useCoinToss({ tossCount });
  const percentColorClasses = (percent: number) => {
    if (percent >= 90) return 'text-blue-500';
    if (percent >= 75) return 'text-cyan-500';
    if (percent >= 50) return 'text-green-500';
    if (percent >= 25) return 'text-yellow-500';
    if (percent >= 10) return 'text-orange-500';
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
            <ul className="steps">
              {tossCountSelection.map((count) => {
                return (
                  <li
                    key={count}
                    className={`step ${count === tossCount ? 'step-primary' : ''} cursor-pointer`}
                    onClick={() => setTossCount(count)}
                  >
                    {count}
                  </li>
                );
              })}
            </ul>
          </Label>
        </Section3>
        <H3>表が出る回数と確率</H3>
        <div className="flex flex-row w-full h-80 overflow-auto gap-x-12 justify-center">
          <div></div>パターン数: {2 ** tossCount}
          <DlCol>
            {probabilities.map((p) => {
              return (
                <Fragment key={p.count}>
                  <Dt>{p.count}回 </Dt>
                  <Dd>
                    <span className={percentColorClasses(p.probability)}>
                      {p.probability}
                    </span>
                    %
                  </Dd>
                </Fragment>
              );
            })}
          </DlCol>
          <DlCol>
            {tossCount > 1 &&
              probabilitiesGreater.map((p) => {
                return (
                  <Fragment key={p.count}>
                    <Dt>
                      {p.count}回
                      {p.count === 0 || p.count === tossCount ? '' : '以上'}
                    </Dt>
                    <Dd>
                      <span className={percentColorClasses(p.probability)}>
                        {p.probability}
                      </span>
                      %
                    </Dd>
                  </Fragment>
                );
              })}
          </DlCol>
        </div>
      </Section2>
    </Section1>
  );
};
