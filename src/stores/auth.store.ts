import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

type LoginPayload = {
  token: string;
  user: User;
};

type AuthState = {
  token: string | null;
  user: User | null;
  isHydrated: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  login: (payload: LoginPayload) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isHydrated: false,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      login: ({ token, user }) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
      setHydrated: (value) => set({ isHydrated: value }),
    }),
    {
      name: 'el-ojo-negro-auth',
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
