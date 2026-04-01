# FinanceHub Dashboard

A clean, modern, and responsive finance dashboard UI built with React, Tailwind CSS, and Recharts.

## Features

- Dashboard overview with balance, income, and expense summary cards
- Time-based balance trend chart and spending-by-category donut chart
- Transactions list with search, filters, and sorting
- Role-based UI (Admin can add/edit/delete, Viewer is read-only)
- Insights panel (highest spend, income vs expense, savings health)
- Dark mode toggle, smooth transitions, and empty states
- LocalStorage persistence and CSV export

## Tech Stack

- React (Vite)
- Tailwind CSS
- Recharts
- React Icons

## Project Structure

- src/components: UI building blocks
- src/pages: Page layouts
- src/context: Global app state
- src/utils: Data, formatting, filtering, exports

## Setup

```bash
npm install
npm run dev
```

## Notes

- All data is mock data stored in localStorage once the app loads.
- Switch roles using the role toggle in the header to unlock admin actions.
