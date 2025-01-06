import { BinarySearch } from '@/components/objects/BinarySearch';
import { CoinToss } from '@/components/objects/CoinToss';
import { RunLengthEncoding } from '@/components/objects/RunLengthEncoding';
import { H1 } from '@/components/atoms/Headings';
export default function Home() {
  return (
    <>
      <main className="lg:max-w-screen-lg md:max-w-screen-md flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <H1>アルゴリズム</H1>
        <section className="flex flex-col gap-4 items-center">
          <BinarySearch />
          <CoinToss />
          <RunLengthEncoding />
          <H1>確率計算</H1>
          <CoinToss />
        </section>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </>
  );
}
