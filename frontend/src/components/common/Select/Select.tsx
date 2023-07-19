import { ReactNode, useCallback, useState } from 'react';
import { styled } from 'styled-components';

import SelectContext from './SelectContext';
import SelectItem from './SelectItem';
import SelectList from './SelectList';
import SelectTrigger from './SelectTrigger';

type Props = {
  children: ReactNode;
  label?: ReactNode;
};

const Select = ({ children, label }: Props) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const changeSelectedItem = useCallback(
    (value: string) => {
      setSelectedItem(value);
    },
    [setSelectedItem],
  );

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <SelectContext.Provider value={{ selectedItem, isOpen, changeSelectedItem, toggleOpen }}>
      {label}
      <Layout>{children}</Layout>
    </SelectContext.Provider>
  );
};

export default Select;

const Layout = styled.div`
  width: 100%;
`;

Select.Trigger = SelectTrigger;
Select.List = SelectList;
Select.Item = SelectItem;
