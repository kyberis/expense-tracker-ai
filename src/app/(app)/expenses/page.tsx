"use client";

import { useState } from "react";
import { useExpenses } from "@/lib/hooks";
import { filterExpenses, exportToCSV } from "@/lib/utils";
import { Expense } from "@/lib/types";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import ExpenseFiltersComponent from "@/components/ExpenseFilters";

export default function ExpensesPage() {
  const { expenses, filters, setFilters, resetFilters, addExpense, editExpense, deleteExpense, isLoaded } = useExpenses();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = filterExpenses(expenses, filters);

  async function handleSubmit(data: Parameters<typeof addExpense>[0]) {
    if (editingExpense) {
      await editExpense(editingExpense.id, data);
      setEditingExpense(null);
    } else {
      await addExpense(data);
    }
    setShowForm(false);
  }

  function handleEdit(expense: Expense) {
    setEditingExpense(expense);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleCancelEdit() {
    setEditingExpense(null);
    setShowForm(false);
  }

  if (!isLoaded) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and track all your expenses</p>
        </div>
        <div className="flex gap-2">
          {expenses.length > 0 && (
            <button
              onClick={() => exportToCSV(filtered)}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden sm:inline">Export</span>
            </button>
          )}
          <button
            onClick={() => {
              setShowForm(!showForm);
              if (showForm) setEditingExpense(null);
            }}
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              showForm
                ? "text-gray-700 bg-white border border-gray-200 hover:bg-gray-50"
                : "text-white bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {showForm ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Close
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Expense
              </>
            )}
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6 animate-slide-up">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">
            {editingExpense ? "Edit Expense" : "New Expense"}
          </h2>
          <ExpenseForm
            onSubmit={handleSubmit}
            editingExpense={editingExpense}
            onCancelEdit={handleCancelEdit}
          />
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
        <ExpenseFiltersComponent
          filters={filters}
          onChange={setFilters}
          onReset={resetFilters}
          totalResults={filtered.length}
        />
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
        <ExpenseList expenses={filtered} onEdit={handleEdit} onDelete={deleteExpense} />
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-36 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-56 mb-6" />
      <div className="h-36 bg-gray-100 rounded-xl mb-4" />
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded-xl" />
        ))}
      </div>
    </div>
  );
}
