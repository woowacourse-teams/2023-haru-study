import { createContext, useContext } from 'react';

export type SelectContextType = {
  isOpen: boolean;
  selectedItem: string | null;
  triggerSuffixText: string;
  toggleOpen: () => void;
  changeSelectedItem: (item: string) => void;
  changeTriggerSuffixText: (value: string) => void;
};

const SelectContext = createContext<SelectContextType>({
  selectedItem: null,
  isOpen: false,
  triggerSuffixText: '',
  toggleOpen: () => {},
  changeSelectedItem: () => {},
  changeTriggerSuffixText: () => {},
});

export const useSelectContext = () => useContext(SelectContext);

export default SelectContext;
