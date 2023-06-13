import { ReactNode, createContext, useEffect, useState } from "react";

interface Transaction {
  id: number,
  description: string;
  type: 'income'| 'outcome';
  price: number;
  category: string;
  createAt: string;
}

interface TransactionContextType {
  transactions: Transaction[]
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json();

    setTransactions(data);
  }

  useEffect(() => {
    loadTransactions()
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}