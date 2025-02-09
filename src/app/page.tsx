import { BinarySearch } from '@/components/objects/BinarySearch';
import { CoinToss } from '@/components/objects/CoinToss';
import { RunLengthEncoding } from '@/components/objects/RunLengthEncoding';
import { HashingMethod } from '@/components/objects/HashingMethod';
import { NestedLinkedList } from '@/components/objects/NestedLinkedList';
import { H1 } from '@/components/atoms/Headings';
import { Random2DigitMultiplication } from '@/components/objects/Random2DigitMultiplication';
export default function Home() {
  return (
    <>
      <main className="lg:w-max-(--breakpoint-lg) md:w-max-(--breakpoint-md) sm:w-max-(--breakpoint-sm) flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <H1>アルゴリズム</H1>
        <section className="flex flex-col items-center w-full gap-4">
          <BinarySearch />
          <RunLengthEncoding />
          <HashingMethod />
          <NestedLinkedList />
        </section>
        <H1>確率計算</H1>
        <section className="flex flex-col items-center w-full gap-4">
          <CoinToss />
        </section>
        <H1>算数の練習</H1>
        <section className="flex flex-col items-center w-full gap-4">
          <Random2DigitMultiplication />
        </section>
      </main>
      <footer className="flex flex-wrap items-center justify-center row-start-3 gap-6"></footer>
    </>
  );
}
