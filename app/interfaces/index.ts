export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AccountingProps {
  id: string;
  date: Date;
  description: string;
  amount: number;
  currency: string;
  type: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchParams {
  q?: string;
  currency?: string;
  type?: string;
  page?: string;
  pageSize?: string;
}

export interface AccountingListProps {
  accountings: AccountingProps[];
  totalPages: number;
}

export interface SearchParamsForBarChart {
  currencyToTake?: string;
}

export interface AccountingsForBarChartProps {
  amount: number;
  id: string;
  date: Date;
  type: string;
}
