import type { AuthProvider } from './auth';

export type MemberInfo = {
  memberId: string;
  name: string;
  email: string | null;
  imageUrl: string | null;
  loginType: AuthProvider;
};
