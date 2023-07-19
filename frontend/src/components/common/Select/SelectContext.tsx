import { createContext, useContext } from 'react';

export type SelectContextType = {
  isOpen: boolean;
  selectedItem: string | null;
  toggleOpen: () => void;
  changeSelectedItem: (item: string) => void;
};

const SelectContext = createContext<SelectContextType>({
  selectedItem: null,
  isOpen: false,
  toggleOpen: () => {},
  changeSelectedItem: () => {},
});

export const useSelectContext = () => useContext(SelectContext);

export default SelectContext;
