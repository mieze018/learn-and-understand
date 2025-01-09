'use client';
import { useHashingMethod } from '@/hooks/useHashingMethod';
import { H2 } from '@/components/atoms/Headings';
import {
  TextInput,
  NumberInput,
  Label,
  Button,
} from '@/components/atoms/Forms';
import {
  TableWrapper,
  Table,
  TBody,
  Th,
  Tr,
  Td,
} from '@/components/atoms/Table';
import { Section1, Section2, Section3 } from '@/components/atoms/Sections';
export const HashingMethod = () => {
  const {
    maxHashNumber,
    setMaxHashNumber,
    hashTable,
    value,
    setValue,
    isError,
    hashing,
    valueArray,
  } = useHashingMethod();
  return (
    <Section1>
      <H2>ハッシュ法テーブル</H2>
      <Section2>
        <Section3>
          <Label htmlFor="maxHashNumber">最大のハッシュ値</Label>

          <NumberInput
            placeholder="最大のハッシュ値"
            value={maxHashNumber}
            onChange={(e) => setMaxHashNumber(Number(e.target.value))}
            name="maxHashNumber"
            className="w-20"
          />
          <TextInput
            placeholder="カンマ区切りで数字を入力"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button onClick={() => hashing()} disabled={!maxHashNumber || !value}>
            ハッシュ化
          </Button>
        </Section3>

        <Section3>対象の数字: {valueArray.join(' | ')}</Section3>
        <Section3 className="justify-around">
          {isError && 'エラー: 0以外の数字を入力してください'}
          <TableWrapper>
            <Table>
              <TBody>
                {hashTable.map((h, i) => {
                  return (
                    <Tr key={i}>
                      <Th
                        className={
                          hashTable.some((h) => h[1] === i + 1)
                            ? 'text-blue-500'
                            : ''
                        }
                      >
                        {i + 1}
                      </Th>
                      <Td className={h[0] > 0 ? 'text-green-500' : ''}>
                        {h[0]}
                      </Td>
                      <Td className={h[1] > 0 ? 'text-blue-500' : ''}>
                        {h[1]}
                      </Td>
                    </Tr>
                  );
                })}
              </TBody>
            </Table>
          </TableWrapper>
        </Section3>
      </Section2>
    </Section1>
  );
};
