"use client";

import { Expense } from "@/lib/types";
import {
  formatCurrency,
  getTotalSpending,
  getMonthlySpending,
  getWeeklySpending,
  getAverageExpense,
} from "@/lib/utils";

interface Props {
  expenses: Expense[];
}

const cards = [
  { label: "Total Spending", getValue: getTotalSpending, icon: "💰", color: "emerald" },
  { label: "This Month", getValue: getMonthlySpending, icon: "📅", color: "blue" },
  { label: "This Week", getValue: getWeeklySpending, icon: "📆", color: "purple" },
  { label: "Avg per Expense", getValue: getAverageExpense, icon: "📊", color: "amber" },
] as const;

const colorMap: Record<string, { bg: string; ring: string; text: string }> = {
  emerald: { bg: "bg-emerald-50", ring: "ring-emerald-500/20", text: "text-emerald-700" },
  blue: { bg: "bg-blue-50", ring: "ring-blue-500/20", text: "text-blue-700" },
  purple: { bg: "bg-purple-50", ring: "ring-purple-500/20", text: "text-purple-700" },
  amber: { bg: "bg-amber-50", ring: "ring-amber-500/20", text: "text-amber-700" },
};

export default function SummaryCards({ expenses }: Props) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const c = colorMap[card.color];
        return (
          <div
            key={card.label}
            className={`${c.bg} rounded-xl p-4 sm:p-5 ring-1 ${c.ring}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{card.icon}</span>
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {card.label}
              </span>
            </div>
            <p className={`text-xl sm:text-2xl font-bold ${c.text}`}>
              {formatCurrency(card.getValue(expenses))}
            </p>
          </div>
        );
      })}
    </div>
  );
}
