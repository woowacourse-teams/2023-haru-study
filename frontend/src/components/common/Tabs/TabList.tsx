import { Children, PropsWithChildren, ReactElement, cloneElement } from 'react';
import { styled } from 'styled-components';

const TabList = ({ children }: PropsWithChildren) => {
  return (
    <TabListLayout>
      {Children.map(children, (child, index) => {
        const item = child as ReactElement;

        return cloneElement(item, { index });
      })}
    </TabListLayout>
  );
};

export default TabList;

const TabListLayout = styled.ul`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  row-gap: 20px;
`;
