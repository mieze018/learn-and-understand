'use client';
import { useCoinToss } from '@/hooks/useCoinToss';
import { Fragment } from 'react';
import { H2, H3 } from '@/components/atoms/Headings';
import { DlCol, Dd, Dt } from '@/components/atoms/DescriptionList';

import { Section1, Section2, Section3 } from '@/components/atoms/Sections';
import {
  TableWrapper,
  Table,
  THead,
  TBody,
  Th,
  Tr,
  Td,
} from '@/components/atoms/Table';
import {
  Label,
  LabelSpan,
  LabelWrapper,
  Radio,
} from '@/components/atoms/Forms';
export const CoinToss = () => {
  const {
    probabilities,
    probabilitiesGreater,
    probabilitiesConsecutive,
    tossCountSelection,
    tossCount,
    setTossCount,
    percentColorClasses,
    patternCount,
    decimalPlaces,
    setDecimalPlaces,
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
        <Section3>
          小数点以下の桁数
          {[0, 1, 2, 3, 4, 5].map((dp) => {
            const selected = dp === decimalPlaces;
            return (
              <LabelWrapper key={dp} className={selected ? 'text-primary' : ''}>
                <Radio
                  name="decimalPlaces"
                  value={dp}
                  checked={selected}
                  onChange={() => setDecimalPlaces(dp)}
                />
                <LabelSpan>{dp}</LabelSpan>
              </LabelWrapper>
            );
          })}
        </Section3>
        <H3>表が出る回数と確率</H3>
        <div>パターン数: {patternCount.toLocaleString()}</div>
        <div className="flex flex-row w-full overflow-auto gap-x-12 justify-center">
          <DlCol $columns={3}>
            <Dt></Dt>
            <Dd>n回表の確率</Dd>
            <Dd></Dd>
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
            <Dt></Dt>
            <Dd>n回以上表の確率</Dd>
            <Dd></Dd>
            {tossCount > 1 &&
              probabilitiesGreater.map((p) => {
                return (
                  <Fragment key={p.count}>
                    <Dt>
                      {p.count}回{greaterDtText(p.count)}
                    </Dt>
                    <Dd className={percentColorClasses(p.probability)}>
                      {p.probability}
                    </Dd>
                    <Dd>%</Dd>
                  </Fragment>
                );
              })}
          </DlCol>
          <DlCol $columns={3}>
            <Dt></Dt>
            <Dd>{tossCount}回連続表の確率</Dd>
            <Dd></Dd>
            <Dt></Dt>
            <Dd
              className={percentColorClasses(
                probabilitiesConsecutive.probability,
              )}
            >
              {probabilitiesConsecutive.probability}
            </Dd>
            <Dd>%</Dd>
            <Dt></Dt>
            <Dd>( 1 / {patternCount} )</Dd>
            <Dd> </Dd>
          </DlCol>
        </div>
        <div>全てのパターンリスト</div>
        {allPatternsTable(patternCount, tossCount)}

        <div>
          {tossCount} bit は {patternCount.toLocaleString()}通り
        </div>
      </Section2>
    </Section1>
  );
};

const allPatternsTable = (patternCount: number, tossCount: number) => {
  if (patternCount > 300) {
    return (
      <div className="text-warning">パターン数が多すぎるため表示できません</div>
    );
  }
  return (
    <TableWrapper className="overflow-auto max-w-[80vw]">
      <Table>
        <THead>
          <Tr>
            <Th></Th>
            {Array.from({ length: tossCount }, (_, i) => {
              return <Th key={i}>{i + 1}</Th>;
            })}
          </Tr>
        </THead>
        <TBody>
          {Array.from({ length: patternCount }, (_, pc) => {
            return (
              <Tr key={pc}>
                <Td>{pc + 1}</Td>
                {Array.from({ length: tossCount }, (__, tc) => {
                  const bit = (pc >> tc) & 1;
                  return (
                    <Td
                      key={tc}
                      className={bit ? 'text-primary' : 'text-secondary'}
                    >
                      {bit}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </TBody>
      </Table>
    </TableWrapper>
  );
};
