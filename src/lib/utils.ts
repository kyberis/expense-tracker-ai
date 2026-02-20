import { Expense, ExpenseFilters, Category, CATEGORIES } from "./types";
import {
  format,
  parseISO,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  subMonths,
  startOfWeek,
  endOfWeek,
} from "date-fns";

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  return format(parseISO(dateStr), "MMM d, yyyy");
}

export function formatDateShort(dateStr: string): string {
  return format(parseISO(dateStr), "MMM d");
}

export function getTodayISO(): string {
  return format(new Date(), "yyyy-MM-dd");
}

export function getMonthStart(): string {
  return format(startOfMonth(new Date()), "yyyy-MM-dd");
}

export function getMonthEnd(): string {
  return format(endOfMonth(new Date()), "yyyy-MM-dd");
}

export function getWeekStart(): string {
  return format(startOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");
}

export function getWeekEnd(): string {
  return format(endOfWeek(new Date(), { weekStartsOn: 1 }), "yyyy-MM-dd");
}

export function filterExpenses(
  expenses: Expense[],
  filters: ExpenseFilters
): Expense[] {
  let result = [...expenses];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (e) =>
        e.description.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q)
    );
  }

  if (filters.category !== "All") {
    result = result.filter((e) => e.category === filters.category);
  }

  if (filters.dateRange.start && filters.dateRange.end) {
    const start = parseISO(filters.dateRange.start);
    const end = parseISO(filters.dateRange.end);
    result = result.filter((e) => {
      const d = parseISO(e.date);
      return isWithinInterval(d, { start, end });
    });
  }

  result.sort((a, b) => {
    let cmp = 0;
    switch (filters.sortBy) {
      case "date":
        cmp = a.date.localeCompare(b.date);
        break;
      case "amount":
        cmp = a.amount - b.amount;
        break;
      case "category":
        cmp = a.category.localeCompare(b.category);
        break;
    }
    return filters.sortOrder === "asc" ? cmp : -cmp;
  });

  return result;
}

export function getTotalSpending(expenses: Expense[]): number {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

export function getMonthlySpending(expenses: Expense[]): number {
  const now = new Date();
  const start = startOfMonth(now);
  const end = endOfMonth(now);
  return expenses
    .filter((e) => isWithinInterval(parseISO(e.date), { start, end }))
    .reduce((sum, e) => sum + e.amount, 0);
}

export function getWeeklySpending(expenses: Expense[]): number {
  const now = new Date();
  const start = startOfWeek(now, { weekStartsOn: 1 });
  const end = endOfWeek(now, { weekStartsOn: 1 });
  return expenses
    .filter((e) => isWithinInterval(parseISO(e.date), { start, end }))
    .reduce((sum, e) => sum + e.amount, 0);
}

export function getSpendingByCategory(
  expenses: Expense[]
): { category: Category; amount: number; count: number }[] {
  const map = new Map<Category, { amount: number; count: number }>();
  for (const e of expenses) {
    const entry = map.get(e.category) || { amount: 0, count: 0 };
    entry.amount += e.amount;
    entry.count += 1;
    map.set(e.category, entry);
  }
  return CATEGORIES.filter((c) => map.has(c)).map((c) => ({
    category: c,
    amount: map.get(c)!.amount,
    count: map.get(c)!.count,
  }));
}

export function getMonthlyTrend(
  expenses: Expense[],
  months: number = 6
): { month: string; amount: number }[] {
  const now = new Date();
  const result: { month: string; amount: number }[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const d = subMonths(now, i);
    const start = startOfMonth(d);
    const end = endOfMonth(d);
    const amount = expenses
      .filter((e) => isWithinInterval(parseISO(e.date), { start, end }))
      .reduce((sum, e) => sum + e.amount, 0);
    result.push({ month: format(d, "MMM yyyy"), amount });
  }

  return result;
}

export function getDailySpending(
  expenses: Expense[],
  days: number = 30
): { date: string; amount: number }[] {
  const now = new Date();
  const map = new Map<string, number>();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = format(d, "yyyy-MM-dd");
    map.set(key, 0);
  }

  for (const e of expenses) {
    if (map.has(e.date)) {
      map.set(e.date, (map.get(e.date) || 0) + e.amount);
    }
  }

  return Array.from(map.entries()).map(([date, amount]) => ({
    date: format(parseISO(date), "MMM d"),
    amount,
  }));
}

export function getAverageExpense(expenses: Expense[]): number {
  if (expenses.length === 0) return 0;
  return getTotalSpending(expenses) / expenses.length;
}

export function exportToCSV(expenses: Expense[]): void {
  const headers = ["Date", "Category", "Description", "Amount"];
  const rows = expenses.map((e) => [
    e.date,
    e.category,
    `"${e.description.replace(/"/g, '""')}"`,
    e.amount.toFixed(2),
  ]);
  const csv = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `expenses-${format(new Date(), "yyyy-MM-dd")}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
