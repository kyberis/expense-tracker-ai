"use client";

import { useState, useEffect, useCallback } from "react";
import { Expense, ExpenseFilters } from "./types";
import {
  getExpenses,
  addExpense as apiAddExpense,
  updateExpense as apiUpdateExpense,
  deleteExpense as apiDeleteExpense,
} from "./storage";

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
    getExpenses().then((data) => {
      setExpenses(data);
      setIsLoaded(true);
    });
  }, []);

  const addExpense = useCallback(
    async (data: { amount: number; category: Expense["category"]; description: string; date: string }) => {
      const expense = await apiAddExpense(data);
      setExpenses((prev) => [expense, ...prev]);
      return expense;
    },
    []
  );

  const editExpense = useCallback(
    async (id: string, data: Partial<Omit<Expense, "id" | "createdAt">>) => {
      const updated = await apiUpdateExpense(id, data);
      setExpenses((prev) => prev.map((e) => (e.id === id ? updated : e)));
    },
    []
  );

  const deleteExpense = useCallback(async (id: string) => {
    await apiDeleteExpense(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

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
