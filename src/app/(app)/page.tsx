"use client";

import { useExpenses } from "@/lib/hooks";
import SummaryCards from "@/components/SummaryCards";
import { CategoryChart, MonthlyTrendChart, DailySpendingChart } from "@/components/Charts";
import TopCategories from "@/components/TopCategories";
import RecentExpenses from "@/components/RecentExpenses";
import { exportToCSV } from "@/lib/utils";

export default function DashboardPage() {
  const { expenses, isLoaded } = useExpenses();

  if (!isLoaded) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Your spending overview at a glance</p>
        </div>
        {expenses.length > 0 && (
          <button
            onClick={() => exportToCSV(expenses)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
        )}
      </div>

      {/* Summary cards */}
      <div className="mb-8 animate-slide-up">
        <SummaryCards expenses={expenses} />
      </div>

      {expenses.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">No expenses yet</h2>
          <p className="text-sm text-gray-500 mb-4">Start tracking your spending by adding your first expense.</p>
          <a
            href="/expenses"
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Add your first expense
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Charts */}
          <div className="lg:col-span-2 space-y-6">
            <Card title="Monthly Spending Trend">
              <MonthlyTrendChart expenses={expenses} />
            </Card>
            <Card title="Daily Spending (Last 30 Days)">
              <DailySpendingChart expenses={expenses} />
            </Card>
            <Card title="Spending by Category">
              <CategoryChart expenses={expenses} />
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <Card title="Top Categories">
              <TopCategories expenses={expenses} />
            </Card>
            <Card title="Recent Expenses">
              <RecentExpenses expenses={expenses} />
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 animate-slide-up">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-40 mb-2" />
      <div className="h-4 bg-gray-100 rounded w-64 mb-6" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 bg-gray-100 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-72 bg-gray-100 rounded-xl" />
          <div className="h-72 bg-gray-100 rounded-xl" />
        </div>
        <div className="space-y-6">
          <div className="h-56 bg-gray-100 rounded-xl" />
          <div className="h-56 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
