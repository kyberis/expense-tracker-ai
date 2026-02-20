# ExpenseTracker — Personal Finance Manager

A modern, professional expense tracking web application with multi-user accounts and persistent database storage.

![Dashboard](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8) ![Postgres](https://img.shields.io/badge/Postgres-Vercel-blue) ![NextAuth](https://img.shields.io/badge/NextAuth.js-4-purple)

## Features

- **User Authentication** — register, login, per-user data isolation via NextAuth.js
- **Dashboard** with summary cards (total, monthly, weekly, average spending)
- **Interactive Charts** — monthly trend (bar), daily spending (area), category breakdown (donut) via Recharts
- **Expense CRUD** — add, edit, and delete expenses with form validation
- **Search & Filter** — by text, category, date range, with multiple sort options
- **CSV Export** of all or filtered expenses
- **Data Persistence** via Vercel Postgres + Prisma ORM
- **Responsive Design** — desktop sidebar + mobile bottom navigation
- **Categories**: Food, Transportation, Entertainment, Shopping, Bills, Other

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: Vercel Postgres (Neon)
- **ORM**: Prisma
- **Auth**: NextAuth.js (Credentials provider, JWT sessions)
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Date Utilities**: date-fns

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

You need:
- `DATABASE_URL` — a Postgres connection string (create one at [Vercel Storage](https://vercel.com/dashboard) or use any Postgres instance)
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` — `http://localhost:3000` for local dev

### 3. Push the schema to the database

```bash
npx prisma db push
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

1. Push the repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. In the Vercel dashboard, go to **Storage** and create a **Postgres** database
4. Link the database to your project — this auto-injects `DATABASE_URL`
5. Add `NEXTAUTH_SECRET` and `NEXTAUTH_URL` (your production domain) to the project's Environment Variables
6. Deploy — Prisma tables are created automatically on first build

## Project Structure

```
src/
├── app/
│   ├── (app)/                    # Protected app routes
│   │   ├── page.tsx              # Dashboard
│   │   ├── layout.tsx            # Auth guard + sidebar
│   │   └── expenses/page.tsx     # Expense management
│   ├── (auth)/                   # Public auth routes
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/   # NextAuth endpoints
│       ├── auth/register/        # Registration endpoint
│       └── expenses/             # Expense CRUD API
├── components/                   # React UI components
├── lib/
│   ├── auth-options.ts           # NextAuth configuration
│   ├── prisma.ts                 # Prisma singleton client
│   ├── hooks.ts                  # useExpenses, useDebounce
│   ├── storage.ts                # API fetch layer
│   ├── types.ts                  # TypeScript types & constants
│   └── utils.ts                  # Formatting, filtering, analytics, CSV
└── types/
    └── next-auth.d.ts            # NextAuth type augmentation
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
> **SPECIFIC FUNCTIONALITY:**
> - New Account / Allow login / Multiple accounts
> - Expense form with validation
> - Expense list with search and filter capabilities
> - Summary cards showing total spending, monthly spending, top categories
> - Basic charts or visual representations of spending patterns
> - Export functionality (at least CSV)
> - Delete and edit existing expenses
> - Deploy to Vercel with Vercel Postgres for persistent storage
