"use client";

import Link from "next/link";
import { Expense, CATEGORY_ICONS, CATEGORY_COLORS } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Props {
  expenses: Expense[];
}

export default function RecentExpenses({ expenses }: Props) {
  const recent = expenses
    .sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);

  if (recent.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-gray-400">
        No expenses added yet
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {recent.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
            style={{ backgroundColor: `${CATEGORY_COLORS[expense.category]}15` }}
          >
            {CATEGORY_ICONS[expense.category]}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{expense.description}</p>
            <p className="text-xs text-gray-400">{formatDate(expense.date)}</p>
          </div>
          <p className="text-sm font-semibold text-gray-900 shrink-0">
            {formatCurrency(expense.amount)}
          </p>
        </div>
      ))}
      <Link
        href="/expenses"
        className="block text-center text-sm text-emerald-600 hover:text-emerald-700 font-medium pt-2"
      >
        View all expenses →
      </Link>
    </div>
  );
}
