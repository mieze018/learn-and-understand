'use client';
import { H2 } from '@/components/atoms/Headings';
import { useLinkedList } from '@/hooks/useLinkedList';

import { Section1, Section2, Section3 } from '@/components/atoms/Sections';
export const LinkedList = () => {
  return (
    <Section1>
      <H2>連結リスト</H2>
      <Section2>
        <Section3>
          <div></div>
        </Section3>
      </Section2>
    </Section1>
  );
};
