"use client";

import { useState } from "react";
import { Expense, CATEGORY_ICONS, CATEGORY_COLORS } from "@/lib/types";
import { formatCurrency, formatDate } from "@/lib/utils";

interface Props {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export default function ExpenseList({ expenses, onEdit, onDelete }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function handleDelete(id: string) {
    if (deletingId === id) {
      onDelete(id);
      setDeletingId(null);
    } else {
      setDeletingId(id);
      setTimeout(() => setDeletingId(null), 3000);
    }
  }

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-gray-500 font-medium">No expenses found</p>
        <p className="text-gray-400 text-sm mt-1">Add your first expense or adjust your filters</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center gap-3 sm:gap-4 py-3.5 px-1 group hover:bg-gray-50/50 transition-colors rounded-lg"
        >
          {/* Category icon */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
            style={{ backgroundColor: `${CATEGORY_COLORS[expense.category]}15` }}
          >
            {CATEGORY_ICONS[expense.category]}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{expense.description}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span
                className="inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-medium"
                style={{
                  backgroundColor: `${CATEGORY_COLORS[expense.category]}15`,
                  color: CATEGORY_COLORS[expense.category],
                }}
              >
                {expense.category}
              </span>
              <span className="text-xs text-gray-400">{formatDate(expense.date)}</span>
            </div>
          </div>

          {/* Amount */}
          <div className="text-right shrink-0">
            <p className="text-sm font-semibold text-gray-900">{formatCurrency(expense.amount)}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(expense)}
              className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-colors"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => handleDelete(expense.id)}
              className={`p-1.5 rounded-md transition-colors ${
                deletingId === expense.id
                  ? "text-red-600 bg-red-50"
                  : "text-gray-400 hover:text-red-600 hover:bg-red-50"
              }`}
              title={deletingId === expense.id ? "Click again to confirm" : "Delete"}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
