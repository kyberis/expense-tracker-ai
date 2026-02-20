"use client";

import { Expense, CATEGORY_COLORS } from "@/lib/types";
import { getSpendingByCategory, getMonthlyTrend, getDailySpending, formatCurrency } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

interface Props {
  expenses: Expense[];
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white/95 backdrop-blur border border-gray-200 rounded-lg px-3 py-2 shadow-lg">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-900">{formatCurrency(payload[0].value)}</p>
    </div>
  );
}

export function CategoryChart({ expenses }: Props) {
  const data = getSpendingByCategory(expenses);

  if (data.length === 0) {
    return <EmptyChart message="No category data yet" />;
  }

  const total = data.reduce((s, d) => s + d.amount, 0);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="w-48 h-48 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
              dataKey="amount"
            >
              {data.map((entry) => (
                <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => formatCurrency(Number(value))}
              contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 13 }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 space-y-2 w-full">
        {data
          .sort((a, b) => b.amount - a.amount)
          .map((item) => {
            const pct = total > 0 ? (item.amount / total) * 100 : 0;
            return (
              <div key={item.category} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: CATEGORY_COLORS[item.category] }}
                />
                <span className="text-sm text-gray-700 flex-1">{item.category}</span>
                <span className="text-xs text-gray-400">{pct.toFixed(0)}%</span>
                <span className="text-sm font-medium text-gray-900 w-20 text-right">
                  {formatCurrency(item.amount)}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export function MonthlyTrendChart({ expenses }: Props) {
  const data = getMonthlyTrend(expenses, 6);
  const hasData = data.some((d) => d.amount > 0);

  if (!hasData) {
    return <EmptyChart message="No monthly data yet" />;
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#9ca3af" }} tickLine={false} axisLine={false} />
        <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="amount" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={48} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DailySpendingChart({ expenses }: Props) {
  const data = getDailySpending(expenses, 30);
  const hasData = data.some((d) => d.amount > 0);

  if (!hasData) {
    return <EmptyChart message="No recent spending data" />;
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 11, fill: "#9ca3af" }}
          tickLine={false}
          axisLine={false}
          interval={4}
        />
        <YAxis tick={{ fontSize: 12, fill: "#9ca3af" }} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="amount" stroke="#10b981" fill="url(#areaGrad)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

function EmptyChart({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
      {message}
    </div>
  );
}
