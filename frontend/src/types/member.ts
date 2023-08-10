import type { AuthProvider } from './auth';

export type MemberInfo = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
  loginType: AuthProvider;
};
