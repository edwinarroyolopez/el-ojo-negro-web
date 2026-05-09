import { http } from '@/services/http';
import type { AccountSummary, User } from '@/types';

export type LoginRequest = {
  phone: string;
};

type BackendUser = {
  _id?: string;
  id?: string;
  name?: string;
  role: string;
  phone: string;
  accountId?: string;
};

type BackendAuthResponse = {
  accessToken: string;
  user: BackendUser;
};

export type LoginResponse = {
  token: string;
  user: User;
  account?: AccountSummary | null;
};

type MeResponse = {
  user: {
    id: string;
    name: string;
    role: string;
    phone: string;
  };
  account: AccountSummary;
};

function mapUser(user: BackendUser | MeResponse['user']): User {
  const resolvedId = 'id' in user && user.id ? user.id : '_id' in user ? user._id ?? '' : '';
  const resolvedAccountId = 'accountId' in user ? user.accountId : undefined;

  return {
    id: resolvedId,
    name: user.name?.trim() || 'Operador',
    role: user.role,
    phone: user.phone,
    accountId: resolvedAccountId,
  };
}

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    const { data } = await http.post<BackendAuthResponse>('/auth/login', payload);

    return {
      token: data.accessToken,
      user: mapUser(data.user),
      account: null,
    };
  },

  async me(): Promise<{ user: User; account: AccountSummary }> {
    const { data } = await http.get<MeResponse>('/auth/me');

    return {
      user: mapUser(data.user),
      account: data.account,
    };
  },
};
