import { ReactNode, useCallback, useState } from 'react';
import { CSSProp, css, styled } from 'styled-components';

import useOutsideClick from '@Hooks/common/useOutsideClick';

import SelectContext from './SelectContext';
import SelectItem from './SelectItem';
import SelectList from './SelectList';
import SelectTrigger from './SelectTrigger';

type Props = {
  children: ReactNode;
  label?: ReactNode;

  $style?: CSSProp;
};

const Select = ({ children, label, $style }: Props) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [triggerSuffixText, setTriggerSuffixText] = useState<string>('');

  const closeSelectItems = () => setIsOpen(false);

  const ref = useOutsideClick<HTMLDivElement>(closeSelectItems);

  const changeSelectedItem = useCallback(
    (value: string) => {
      setSelectedItem(value);
    },
    [setSelectedItem],
  );

  const changeTriggerSuffixText = useCallback(
    (value: string) => {
      setTriggerSuffixText(value);
    },
    [setTriggerSuffixText],
  );

  const toggleOpen = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  return (
    <SelectContext.Provider
      value={{ selectedItem, isOpen, changeSelectedItem, toggleOpen, triggerSuffixText, changeTriggerSuffixText }}
    >
      <Layout $style={$style} ref={ref}>
        <label>{label}</label>
        {children}
      </Layout>
    </SelectContext.Provider>
  );
};

export default Select;

const Layout = styled.div<Pick<Props, '$style'>>`
  width: 100%;

  ${({ $style }) => css`
    ${$style};
  `}
`;

Select.Trigger = SelectTrigger;
Select.List = SelectList;
Select.Item = SelectItem;
