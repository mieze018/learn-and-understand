import { useState, useMemo } from 'react';

/**
 * 連結リストを操作するためのカスタムフック
 * 挿入・削除・検索が行える。
 * オプションで、検索時に見つかったNodeを先頭に移動する。
 */
type Value = string;
type Node = {
  value: Value;
  next: Node | null;
};
export const useNestedLinkedList = () => {
  const [head, setHead] = useState<Node | null>(null);
  const [insertValue, setInsertValue] = useState<Value>('');
  const [searchValue, setSearchValue] = useState<Value>('');
  const [searchResult, setSearchResult] = useState<boolean>(false);
  const [isMoveToHead, setIsMoveToHead] = useState<boolean>(false);

  /** 先頭に追加 */
  const insert = () => {
    const newNode: Node = { value: insertValue, next: head };
    setHead(newNode);
  };

  /**先頭を削除 */
  const remove = () => {
    if (!head) return;
    setHead(head.next);
  };

  /**
   * 指定されたノードを先頭に移動する
   * @param node - 先頭に移動するノード
   */
  const moveToHead = (node: Node) => {
    // ノードが既に先頭の場合は何もしない
    if (node === head) return;

    // まず移動するノードのnextと、移動するノードの前のノードとを繋ぎ変える
    // その後、移動するノードのnextをheadに繋ぎ変える
    // そしてheadに移動する
    let current = head;
    // 先頭から順にnextがnullになるまでループ
    while (current) {
      // 移動するノードのnextがこのノードと一致したら、
      if (current.next === node) {
        // このノードのnextを移動するノードのnextに繋ぎ変える
        current.next = node.next;
        // 移動するノードのnextをheadに繋ぎ変える
        node.next = head;
        // headを書き換える
        // memo: もしこの処理を最初にやってしまうと、node.nextがみなしごになる (nodeの前のノードのnextがheadになり、node以降のノードがみなしごになる)
        setHead(node);
        return;
      }
      // 次のノードに進む
      current = current.next;
    }
  };

  /** 値を検索(完全一致) */
  const search = () => {
    let current = head;
    setSearchResult(false);
    while (current) {
      if (current.value === searchValue) {
        setSearchResult(true);
        if (isMoveToHead) {
          moveToHead(current);
        }
        return;
      }
      current = current.next;
    }
  };

  const nodeLength = useMemo(() => {
    let current = head;
    let length = 0;
    while (current) {
      length++;
      current = current.next;
    }
    return length;
  }, [head]);

  /**
   * 連結リストを配列に変換して返す
   * 初めから配列にすればいい話だが試験問題がこの形なので仕方なく
   */
  const listArrayToDisplay = useMemo(() => {
    let current = head;
    const listArray = [];
    while (current) {
      listArray.push(current.value);
      current = current.next;
    }
    return listArray;
  }, [head]);
  return {
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
  };
};

export type UseLinkedListType = ReturnType<typeof useNestedLinkedList>;
