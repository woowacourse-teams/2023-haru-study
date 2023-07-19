import { Children, HTMLAttributes, MouseEvent, ReactNode, cloneElement, isValidElement } from 'react';

import { composeEventHandlers } from '@Utils/domEventHandler';

import { useSelectContext } from './SelectContext';
import { ItemProps } from './SelectItem';

type Props = {
  children: ReactNode;
  onChange: (e: MouseEvent<HTMLDivElement>) => void;
} & HTMLAttributes<HTMLDivElement>;

const SelectList = ({ children, onChange, ...props }: Props) => {
  const { isOpen, changeSelectedItem, toggleOpen } = useSelectContext();

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    if ('dataset' in e.target) {
      changeSelectedItem((e.target.dataset as { value: string }).value);
      toggleOpen();
    }
  };

  const childrenArray = Children.toArray(children);

  return (
    isOpen && (
      <div {...props}>
        {childrenArray.map((child) => {
          if (isValidElement<ItemProps>(child)) {
            return cloneElement(child, {
              ...child.props,
              onClick: composeEventHandlers(onChange, onClick),
            });
          }
          return null;
        })}
      </div>
    )
  );
};

export default SelectList;
