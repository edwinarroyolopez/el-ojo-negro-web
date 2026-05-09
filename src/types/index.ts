export interface User {
  id: string;
  name: string;
  role: string;
  phone: string;
  accountId?: string;
}

export interface AccountSummary {
  id: string;
  name: string;
  isActive: boolean;
  setupComplete: boolean;
}
