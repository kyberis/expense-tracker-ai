# ExpenseTracker — Personal Finance Manager

A modern, professional expense tracking web application with multi-user accounts and persistent database storage.

![Dashboard](https://img.shields.io/badge/Next.js-14-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8) ![Postgres](https://img.shields.io/badge/Postgres-Neon-blue) ![NextAuth](https://img.shields.io/badge/NextAuth.js-4-purple)

## Screenshots

### Login
![Login](/public/screenshots/login.png)

### Create Account
![Register](/public/screenshots/register.png)

### Dashboard
![Dashboard](/public/screenshots/dashboard.png)

### Expenses
![Expenses](/public/screenshots/expenses.png)

## Features

- **User Authentication** — register, login, and per-user data isolation via NextAuth.js
- **Multi-Account Support** — each user has their own private expense data
- **Dashboard** with summary cards (total, monthly, weekly, average spending)
- **Interactive Charts** — monthly trend (bar), daily spending (area), category breakdown (donut) via Recharts
- **Expense CRUD** — add, edit, and delete expenses with form validation
- **Search & Filter** — by text, category, date range, with multiple sort options
- **CSV Export** of all or filtered expenses
- **Data Persistence** via PostgreSQL (Neon/Vercel Postgres) + Prisma ORM
- **Responsive Design** — desktop sidebar + mobile bottom navigation
- **Categories**: Food, Transportation, Entertainment, Shopping, Bills, Other

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Auth | NextAuth.js (Credentials, JWT) |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Dates | date-fns |

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/kyberis/expense-tracker-ai.git
cd expense-tracker-ai
npm install
```

### 2. Create a PostgreSQL database

You need a PostgreSQL database. The easiest free options:

- **Neon** (recommended): go to [neon.tech](https://neon.tech), create a project, and copy the connection string
- **Vercel Postgres**: create one from [vercel.com/dashboard](https://vercel.com/dashboard) under Storage

### 3. Configure environment variables

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# Your PostgreSQL connection string from Neon or Vercel
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"

# Generate a secret: openssl rand -base64 32
NEXTAUTH_SECRET="your-generated-secret"

# Your app URL (http://localhost:3000 for local dev)
NEXTAUTH_URL="http://localhost:3000"
```

Also create a `.env` file with just the `DATABASE_URL` (Prisma CLI reads this):

```bash
echo 'DATABASE_URL="your-connection-string"' > .env
```

### 4. Create database tables

```bash
npx prisma db push
```

### 5. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## How to Use

### Creating an account

1. Open the app — you'll be redirected to the **Login** page
2. Click **"Create one"** to go to the registration page
3. Fill in your **Full Name**, **Email**, and **Password** (min 6 characters)
4. Click **"Create account"** — you'll be signed in and redirected to the Dashboard

### Adding expenses

1. Navigate to the **Expenses** page from the sidebar
2. Click the green **"+ Add Expense"** button
3. Enter the **amount**, select a **category** (Food, Transportation, Entertainment, Shopping, Bills, Other), write a **description**, and pick a **date**
4. Click **"Add Expense"** to save — the expense is stored in the database

### Viewing and filtering

- Use the **search bar** to find expenses by description or category
- Filter by **category** using the dropdown
- Set a **date range** to see expenses within specific dates
- **Sort** by date, amount, or category

### Editing and deleting

- **Hover** over any expense to reveal the edit (pencil) and delete (trash) icons
- Click **edit** to modify the expense details
- Click **delete** once to highlight, click again to confirm deletion

### Dashboard analytics

- The **Dashboard** shows summary cards: Total Spending, This Month, This Week, Average per Expense
- **Monthly Spending Trend** — bar chart of spending over the last 6 months
- **Daily Spending** — area chart of spending over the last 30 days
- **Spending by Category** — donut chart with percentage breakdown

### Exporting data

- Click **"Export CSV"** on either the Dashboard or Expenses page to download your expenses as a CSV file

### Multiple accounts

- Click **"Sign out"** from the sidebar (desktop) or bottom nav (mobile)
- Register a new account with a different email — each account has completely separate expense data

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project at [vercel.com/new](https://vercel.com/new)
3. In the Vercel dashboard, go to **Storage** → create a **Postgres** database and link it to your project (auto-injects `DATABASE_URL`)
4. Add these **Environment Variables** in project settings:
   - `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` — your production URL (e.g. `https://your-app.vercel.app`)
5. Deploy — tables are created automatically on first use

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

## The Prompt That Built This

This entire application was generated from the following prompt using an AI coding assistant:

> I want you to create a modern, professional NextJS expense tracking application. Here's my vision:
>
> **APPLICATION OVERVIEW:**
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
> **DESIGN REQUIREMENTS:**
> - Clean, modern interface with a professional color scheme
> - Intuitive navigation and user experience
> - Visual feedback for user actions
> - Loading states and error handling
> - Mobile-responsive design
>
> **SPECIFIC FUNCTIONALITY:**
> - New Account / Allow login / Multiple accounts
> - Expense form with validation
> - Expense list with search and filter capabilities
> - Summary cards showing total spending, monthly spending, top categories
> - Basic charts or visual representations of spending patterns
> - Export functionality (at least CSV)
> - Delete and edit existing expenses
> - Deploy to Vercel with Vercel Postgres for persistent user and expense storage
