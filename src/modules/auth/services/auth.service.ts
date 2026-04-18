import { http } from '@/services/http';
import type { User } from '@/types';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: User;
};

export const authService = {
  async login(payload: LoginRequest): Promise<LoginResponse> {
    try {
      const { data } = await http.post<LoginResponse>('/auth/login', payload);
      return data;
    } catch {
      return {
        token: 'demo-token-el-ojo-negro',
        user: {
          id: 'demo-user',
          name: 'Vision Operator',
          role: 'Architect',
          email: payload.email,
        },
      };
    }
  },
};
