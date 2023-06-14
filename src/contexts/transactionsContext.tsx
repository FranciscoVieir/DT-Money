import { ReactNode, createContext, useEffect, useState } from "react";

interface Transaction {
  id: number,
  description: string;
  type: 'income'| 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  fecthtransactions: (query?: string) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fecthtransactions(query?: string) {
    const url = new URL('http://localhost:3333/transactions');

    if (query) {
      url.searchParams.append('q', query);
    }

    const response = await fetch(url)
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    fecthtransactions()
  }, []);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fecthtransactions
      }}>
      {children}
    </TransactionsContext.Provider>
  )
}