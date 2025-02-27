'use client';
import { useBinarySearch } from '@/hooks/useBinarySearch';

import { H2, H3 } from '@/components/atoms/Headings';

import { Section1, Section2, Section3 } from '@/components/atoms/Sections';
import { NumberInput, Label } from '@/components/atoms/Forms';

export const BinarySearch = () => {
  const {
    target,
    length,
    searchCount,
    process,
    linerSearchCount,
    compare,
    isError,
    handleLengthChange,
    handleTargetChange,
  } = useBinarySearch();

  return (
    <Section1>
      <H2>二分木探索</H2>
      <Section2>
        <Section3>
          <div>
            <Label htmlFor="length">どの数まで検索？</Label>
            <NumberInput
              isError={isError}
              onChange={(e) => handleLengthChange(e.target.value)}
              value={length}
              name="length"
              title="Length"
            />
          </div>
          <div>
            <Label className="label" htmlFor="target">
              どれを検索？
            </Label>
            <NumberInput
              isError={isError}
              onChange={(e) => handleTargetChange(e.target.value)}
              value={target}
              name="target"
              title="Target"
            />
          </div>
          <div></div>
        </Section3>
        <H3>検索結果</H3>
        <ul className="timeline max-w-max overflow-auto">
          {process.map((p, i) => {
            return (
              <li key={i}>
                {i !== 0 && <hr />}
                <div className="timeline-start text-sm">{p}</div>
                <div className="timeline-middle">
                  <div className="rounded-full h-3 w-3 bg-slate-600" />
                </div>
                <div className="timeline-end">{i + 1}</div>
                {i !== process.length - 1 && <hr />}
              </li>
            );
          })}
        </ul>
        <p className="text-center">二分探索: {searchCount}回</p>
        <p className="text-center">
          線形探索: {linerSearchCount} 回 {compare ? `(${compare}倍)` : ''}
        </p>
      </Section2>
    </Section1>
  );
};
