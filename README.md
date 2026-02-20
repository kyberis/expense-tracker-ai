# ExpenseTracker — Personal Finance Manager

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS.

![Dashboard](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8)

## Features

- **Dashboard** with summary cards (total, monthly, weekly, average spending)
- **Interactive Charts** — monthly trend (bar), daily spending (area), category breakdown (donut) via Recharts
- **Expense CRUD** — add, edit, and delete expenses with form validation
- **Search & Filter** — by text, category, date range, with multiple sort options
- **CSV Export** of all or filtered expenses
- **Data Persistence** via localStorage
- **Responsive Design** — desktop sidebar + mobile bottom navigation
- **Categories**: Food, Transportation, Entertainment, Shopping, Bills, Other

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Date Utilities**: date-fns
- **State**: React hooks + localStorage

## Project Structure

```
src/
├── app/(app)/
│   ├── page.tsx              # Dashboard
│   ├── layout.tsx            # App shell with sidebar
│   └── expenses/page.tsx     # Expense management
├── components/
│   ├── Charts.tsx            # Bar, Area, and Pie charts
│   ├── ExpenseFilters.tsx    # Search, category, date, sort
│   ├── ExpenseForm.tsx       # Add/edit form with validation
│   ├── ExpenseList.tsx       # List with edit/delete actions
│   ├── RecentExpenses.tsx    # Recent expenses widget
│   ├── Sidebar.tsx           # Desktop sidebar + mobile nav
│   ├── SummaryCards.tsx      # Spending summary cards
│   └── TopCategories.tsx     # Category progress bars
└── lib/
    ├── hooks.ts              # useExpenses, useDebounce
    ├── storage.ts            # localStorage CRUD
    ├── types.ts              # TypeScript types & constants
    └── utils.ts              # Formatting, filtering, analytics, CSV
```

---

## Original Prompt

> Build a complete expense tracking web app that helps users manage their personal finances. The app should feel modern, intuitive, and professional.
>
> **CORE FEATURES:**
> - Add expenses with date, amount, category, and description
> - View expenses in a clean, organized list
> - Filter expenses by date range and category
> - Dashboard with spending summaries and basic analytics
> - Categories: Food, Transportation, Entertainment, Shopping, Bills, Other
> - Data persistence using localStorage for this demo
>
> **TECHNICAL REQUIREMENTS:**
> - NextJS 14 with App Router
> - TypeScript for type safety
> - Tailwind CSS for styling with a modern, clean design
> - Responsive design that works on desktop and mobile
> - Use React hooks for state management
> - Form validation for expense inputs
> - Date picker for expense dates
> - Currency formatting for amounts
>
> **DESIGN REQUIREMENTS:**
> - Clean, modern interface with a professional color scheme
> - Intuitive navigation and user experience
> - Visual feedback for user actions
> - Loading states and error handling
> - Mobile-responsive design
>
> **SPECIFIC FUNCTIONALITY:**
> - Expense form with validation
> - Expense list with search and filter capabilities
> - Summary cards showing total spending, monthly spending, top categories
> - Basic charts or visual representations of spending patterns
> - Export functionality (at least CSV)
> - Delete and edit existing expenses
