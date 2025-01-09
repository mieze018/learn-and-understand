'use client';
import { useCoinToss } from '@/hooks/useCoinToss';
import { Fragment } from 'react';
import { H2, H3 } from '@/components/atoms/Headings';
import { DlCol, Dd, Dt } from '@/components/atoms/DescriptionList';

import { Section1, Section2, Section3 } from '@/components/atoms/Sections';
import { Label } from '@/components/atoms/Forms';
export const CoinToss = () => {
  const {
    probabilities,
    probabilitiesGreater,
    tossCountSelection,
    tossCount,
    setTossCount,
    percentColorClasses,
    patternCount,
  } = useCoinToss();

  const stepVariant = (count: number) =>
    count === tossCount ? 'step-primary' : '';
  const greaterDtText = (count: number) =>
    count === 0 || count === tossCount ? '' : '以上';
  return (
    <Section1>
      <H2>コイントスで表が出る回数と確率</H2>
      <Section2>
        <Section3 className="justify-center">
          <Label>
            <ul className="steps">
              {tossCountSelection.map((count) => {
                return (
                  <li
                    key={count}
                    className={`step cursor-pointer ${stepVariant(count)}`}
                    onClick={() => setTossCount(count)}
                  />
                );
              })}
            </ul>
          </Label>
        </Section3>
        <H3>表が出る回数と確率</H3>
        <div>パターン数: {patternCount}</div>
        <div className="flex flex-row w-full overflow-auto gap-x-12 justify-center">
          <DlCol $columns={3}>
            {probabilities.map((p) => {
              return (
                <Fragment key={p.count}>
                  <Dt>{p.count}回 </Dt>
                  <Dd className={percentColorClasses(p.probability)}>
                    {p.probability}
                  </Dd>
                  <Dd>%</Dd>
                </Fragment>
              );
            })}
          </DlCol>
          <DlCol $columns={3}>
            {tossCount > 1 &&
              probabilitiesGreater.map((p) => {
                return (
                  <Fragment key={p.count}>
                    <Dt>
                      {p.count}回{greaterDtText(p.count)}{' '}
                    </Dt>
                    <Dd className={percentColorClasses(p.probability)}>
                      {p.probability}
                    </Dd>
                    <Dd>%</Dd>
                  </Fragment>
                );
              })}
          </DlCol>
        </div>
      </Section2>
    </Section1>
  );
};
