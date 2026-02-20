"use client";

import { ExpenseFilters as FiltersType, CATEGORIES, Category } from "@/lib/types";

interface Props {
  filters: FiltersType;
  onChange: (filters: FiltersType) => void;
  onReset: () => void;
  totalResults: number;
}

export default function ExpenseFilters({ filters, onChange, onReset, totalResults }: Props) {
  const hasActiveFilters =
    filters.search ||
    filters.category !== "All" ||
    filters.dateRange.start ||
    filters.dateRange.end;

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search expenses..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {/* Category filter */}
        <select
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value as Category | "All" })}
          className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Date range */}
        <input
          type="date"
          value={filters.dateRange.start}
          onChange={(e) =>
            onChange({ ...filters, dateRange: { ...filters.dateRange, start: e.target.value } })
          }
          className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
          placeholder="Start date"
        />
        <input
          type="date"
          value={filters.dateRange.end}
          onChange={(e) =>
            onChange({ ...filters, dateRange: { ...filters.dateRange, end: e.target.value } })
          }
          className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
          placeholder="End date"
        />

        {/* Sort */}
        <select
          value={`${filters.sortBy}-${filters.sortOrder}`}
          onChange={(e) => {
            const [sortBy, sortOrder] = e.target.value.split("-") as [FiltersType["sortBy"], FiltersType["sortOrder"]];
            onChange({ ...filters, sortBy, sortOrder });
          }}
          className="px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="amount-desc">Highest Amount</option>
          <option value="amount-asc">Lowest Amount</option>
          <option value="category-asc">Category A-Z</option>
        </select>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{totalResults} expense{totalResults !== 1 ? "s" : ""}</span>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}
