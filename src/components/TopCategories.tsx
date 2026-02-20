"use client";

import { Expense, CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/types";
import { getSpendingByCategory, formatCurrency } from "@/lib/utils";

interface Props {
  expenses: Expense[];
}

export default function TopCategories({ expenses }: Props) {
  const data = getSpendingByCategory(expenses).sort((a, b) => b.amount - a.amount);
  const total = data.reduce((s, d) => s + d.amount, 0);

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-sm text-gray-400">
        No spending data yet
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {data.slice(0, 5).map((item) => {
        const pct = total > 0 ? (item.amount / total) * 100 : 0;
        return (
          <div key={item.category} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm">{CATEGORY_ICONS[item.category]}</span>
                <span className="text-sm font-medium text-gray-700">{item.category}</span>
                <span className="text-xs text-gray-400">({item.count})</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">{formatCurrency(item.amount)}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${pct}%`,
                  backgroundColor: CATEGORY_COLORS[item.category],
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
