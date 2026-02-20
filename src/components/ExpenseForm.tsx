"use client";

import { useState, useEffect } from "react";
import { Category, CATEGORIES, CATEGORY_ICONS, Expense, ExpenseFormData } from "@/lib/types";
import { getTodayISO, cn } from "@/lib/utils";

interface Props {
  onSubmit: (data: { amount: number; category: Category; description: string; date: string }) => void;
  editingExpense?: Expense | null;
  onCancelEdit?: () => void;
}

const INITIAL_FORM: ExpenseFormData = {
  amount: "",
  category: "Food",
  description: "",
  date: getTodayISO(),
};

export default function ExpenseForm({ onSubmit, editingExpense, onCancelEdit }: Props) {
  const [form, setForm] = useState<ExpenseFormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ExpenseFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (editingExpense) {
      setForm({
        amount: editingExpense.amount.toString(),
        category: editingExpense.category,
        description: editingExpense.description,
        date: editingExpense.date,
      });
      setErrors({});
    }
  }, [editingExpense]);

  function validate(): boolean {
    const next: typeof errors = {};
    const amt = parseFloat(form.amount);
    if (!form.amount || isNaN(amt) || amt <= 0) next.amount = "Enter a valid amount greater than 0";
    if (amt > 999999) next.amount = "Amount cannot exceed $999,999";
    if (!form.description.trim()) next.description = "Description is required";
    if (form.description.trim().length > 100) next.description = "Description must be under 100 characters";
    if (!form.date) next.date = "Date is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      amount: parseFloat(parseFloat(form.amount).toFixed(2)),
      category: form.category,
      description: form.description.trim(),
      date: form.date,
    });
    setForm({ ...INITIAL_FORM, date: getTodayISO() });
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  }

  function handleCancel() {
    setForm({ ...INITIAL_FORM, date: getTodayISO() });
    setErrors({});
    onCancelEdit?.();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount ($)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className={cn(
                "w-full pl-7 pr-3 py-2.5 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
                errors.amount ? "border-red-300 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
              )}
            />
          </div>
          {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount}</p>}
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            id="date"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={cn(
              "w-full px-3 py-2.5 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
              errors.date ? "border-red-300 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
            )}
          />
          {errors.date && <p className="mt-1 text-xs text-red-500">{errors.date}</p>}
        </div>
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setForm({ ...form, category: cat })}
              className={cn(
                "flex flex-col items-center gap-1 p-2.5 rounded-lg border text-xs font-medium transition-all",
                form.category === cat
                  ? "border-emerald-500 bg-emerald-50 text-emerald-700 ring-1 ring-emerald-500"
                  : "border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              )}
            >
              <span className="text-lg">{CATEGORY_ICONS[cat]}</span>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <input
          id="description"
          type="text"
          placeholder="What did you spend on?"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          maxLength={100}
          className={cn(
            "w-full px-3 py-2.5 border rounded-lg text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent",
            errors.description ? "border-red-300 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
          )}
        />
        <div className="flex justify-between mt-1">
          {errors.description ? (
            <p className="text-xs text-red-500">{errors.description}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-gray-400">{form.description.length}/100</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          className="flex-1 py-2.5 px-4 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 active:bg-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          {editingExpense ? "Update Expense" : "Add Expense"}
        </button>
        {editingExpense && (
          <button
            type="button"
            onClick={handleCancel}
            className="py-2.5 px-4 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Success feedback */}
      {submitted && !editingExpense && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-sm text-emerald-700 animate-fade-in">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Expense added successfully!
        </div>
      )}
    </form>
  );
}
