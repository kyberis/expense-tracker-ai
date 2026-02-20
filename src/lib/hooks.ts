"use client";

import { useState, useEffect, useCallback } from "react";
import { Expense, ExpenseFilters } from "./types";
import { getExpenses, saveExpenses, deleteExpense as removeExpense } from "./storage";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_FILTERS: ExpenseFilters = {
  search: "",
  category: "All",
  dateRange: { start: "", end: "" },
  sortBy: "date",
  sortOrder: "desc",
};

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<ExpenseFilters>(DEFAULT_FILTERS);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setExpenses(getExpenses());
    setIsLoaded(true);
  }, []);

  const addExpense = useCallback(
    (data: { amount: number; category: Expense["category"]; description: string; date: string }) => {
      const expense: Expense = {
        id: uuidv4(),
        ...data,
        createdAt: new Date().toISOString(),
      };
      const updated = [expense, ...expenses];
      setExpenses(updated);
      saveExpenses(updated);
      return expense;
    },
    [expenses]
  );

  const editExpense = useCallback(
    (id: string, data: Partial<Omit<Expense, "id" | "createdAt">>) => {
      const updated = expenses.map((e) => (e.id === id ? { ...e, ...data } : e));
      setExpenses(updated);
      saveExpenses(updated);
    },
    [expenses]
  );

  const deleteExpense = useCallback(
    (id: string) => {
      const updated = removeExpense(id);
      setExpenses(updated);
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  return {
    expenses,
    filters,
    setFilters,
    resetFilters,
    addExpense,
    editExpense,
    deleteExpense,
    isLoaded,
  };
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}
