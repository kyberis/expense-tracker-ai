import { Expense } from "./types";

export async function getExpenses(): Promise<Expense[]> {
  const res = await fetch("/api/expenses");
  if (!res.ok) return [];
  return res.json();
}

export async function addExpense(
  data: Omit<Expense, "id" | "createdAt" | "userId">
): Promise<Expense> {
  const res = await fetch("/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add expense");
  return res.json();
}

export async function updateExpense(
  id: string,
  data: Partial<Omit<Expense, "id" | "createdAt" | "userId">>
): Promise<Expense> {
  const res = await fetch(`/api/expenses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update expense");
  return res.json();
}

export async function deleteExpense(id: string): Promise<void> {
  const res = await fetch(`/api/expenses/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete expense");
}
