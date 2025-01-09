'use client';
import { useNestedLinkedList } from '@/hooks/useNestedLinkedList';
import { H2 } from '@/components/atoms/Headings';
import {
  TextInput,
  Label,
  Button,
  LabelWrapper,
  Checkbox,
  LabelSpan,
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
export const NestedLinkedList = () => {
  const {
    head,
    insert,
    remove,
    search,
    insertValue,
    setInsertValue,
    nodeLength,
    listArrayToDisplay,
    searchValue,
    setSearchValue,
    searchResult,
    isMoveToHead,
    setIsMoveToHead,
  } = useNestedLinkedList();
  const onInsert = () => {
    insert();
    setInsertValue('');
  };
  return (
    <Section1>
      <H2>ネストした連結リスト</H2>
      <Section2>
        <Section3>
          <Label htmlFor="insert">挿入する値</Label>
          <TextInput
            placeholder="挿入する値"
            name="insert"
            value={insertValue}
            onChange={(e) => setInsertValue(e.target.value)}
          />
          <Button onClick={onInsert} disabled={!insertValue}>
            先頭に挿入
          </Button>
        </Section3>
        <Section3>
          <Button onClick={remove} disabled={!head}>
            先頭を削除
          </Button>
        </Section3>
        <Section3>
          <Label htmlFor="search">検索する値</Label>
          <TextInput
            placeholder="検索する値"
            name="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button onClick={() => search()} disabled={!head}>
            検索
          </Button>
          <LabelWrapper>
            <Checkbox
              type="checkbox"
              name="moveToHead"
              checked={isMoveToHead}
              onChange={() => setIsMoveToHead(!isMoveToHead)}
            />
            <LabelSpan>見つかったノードを先頭に移動</LabelSpan>
          </LabelWrapper>
        </Section3>
      </Section2>
      <Section2>検索結果: {searchResult ? '発見' : 'なし'}</Section2>
      <Section2>
        <div>ノード数: {nodeLength}</div>
        <TableWrapper>
          <Table>
            <TBody>
              {listArrayToDisplay.map((value, index) => (
                <Tr key={index}>
                  <Th>{index}</Th>
                  <Td>{value}</Td>
                </Tr>
              ))}
            </TBody>
          </Table>
        </TableWrapper>
      </Section2>
    </Section1>
  );
};
