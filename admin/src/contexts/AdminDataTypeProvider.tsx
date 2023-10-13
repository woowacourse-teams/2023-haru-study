import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

import type { AdminDataType } from '@Types/index';

export type AdminDataTypeContextType = {
  adminDataType: AdminDataType;
  changeAdminDataType: (adminDataType: AdminDataType) => void;
};

export const AdminDataTypeContext = createContext<AdminDataTypeContextType | null>(null);

const AdminDataTypeProvider = ({ children }: PropsWithChildren) => {
  const [adminDataType, setAdminDataType] = useState<AdminDataType>('studies');

  const changeAdminDataType = (adminDataType: AdminDataType) => {
    setAdminDataType(adminDataType);
  };

  const value = {
    adminDataType,
    changeAdminDataType,
  };

  return <AdminDataTypeContext.Provider value={value}>{children}</AdminDataTypeContext.Provider>;
};

export default AdminDataTypeProvider;

export const useAdminDataType = () => {
  const value = useContext(AdminDataTypeContext);

  if (value === null) {
    throw new Error('AdminDataType 에러');
  }

  return value;
};
