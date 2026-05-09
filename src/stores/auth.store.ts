import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AccountSummary, User } from '@/types';

type LoginPayload = {
  token: string;
  user: User;
  account?: AccountSummary | null;
};

type AuthState = {
  token: string | null;
  user: User | null;
  account: AccountSummary | null;
  isHydrated: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setAccount: (account: AccountSummary | null) => void;
  login: (payload: LoginPayload) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      account: null,
      isHydrated: false,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      setAccount: (account) => set({ account }),
      login: ({ token, user, account = null }) => set({ token, user, account }),
      logout: () => set({ token: null, user: null, account: null }),
      setHydrated: (value) => set({ isHydrated: value }),
    }),
    {
      name: 'el-ojo-negro-auth',
      partialize: (state) => ({ token: state.token, user: state.user, account: state.account }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
