import type { AuthProvider } from './auth';

export type MemberInfo = {
  memberId: string;
  name: string;
  email: string;
  imageUrl: string;
  loginType: AuthProvider;
};
