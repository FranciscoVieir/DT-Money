import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number,
  description: string;
  type: 'income'| 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string,
  price: number,
  category: string,
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[];
  fecthtransactions: (query?: string) => Promise<void>;
  createTransactions: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionContextType);

export function TransactionsProvider({children}: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  async function fecthtransactions(query?: string) {
     await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      }
    })
  }

  async function createTransactions(data: CreateTransactionInput) {
    const {category, description, price, type} = data;

    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(),
    })
    setTransactions((prevState) => [response.data, ...prevState]);
  }



  useEffect(() => {
    fecthtransactions()
  }, []);

  return (
    <TransactionsContext.Provider value={{
      transactions,
      fecthtransactions,
      createTransactions
      }}>
      {children}
    </TransactionsContext.Provider>
  )
}