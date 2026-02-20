import { Expense } from "./types";

const STORAGE_KEY = "expense-tracker-expenses";

export function getExpenses(): Expense[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveExpenses(expenses: Expense[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

export function addExpense(expense: Expense): Expense[] {
  const expenses = getExpenses();
  expenses.unshift(expense);
  saveExpenses(expenses);
  return expenses;
}

export function updateExpense(updated: Expense): Expense[] {
  const expenses = getExpenses().map((e) =>
    e.id === updated.id ? updated : e
  );
  saveExpenses(expenses);
  return expenses;
}

export function deleteExpense(id: string): Expense[] {
  const expenses = getExpenses().filter((e) => e.id !== id);
  saveExpenses(expenses);
  return expenses;
}
