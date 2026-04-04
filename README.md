# FinanceHub Dashboard

A clean, modern, and responsive personal finance dashboard UI built with React, Tailwind CSS, and Recharts.

## Demo

- Live demo: add your link here
- Screenshot: add an image in `public/` and link it here

## Features

- Overview cards for balance, income, and expenses
- Balance trend line chart and spending by category donut chart
- Transactions table with search, filters, and sorting
- Role-based UI: Admin can add/edit/delete, Viewer is read-only
- Insights panel (top spend, income vs expense, savings health)
- Dark mode toggle, smooth transitions, and empty states
- LocalStorage persistence and CSV export

## Tech Stack

- React + Vite
- Tailwind CSS
- Recharts
- React Icons

## Project Structure

```
src/
	components/
	pages/
	context/
	utils/
```

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Scripts

```bash
npm run dev       # start local dev server
npm run build     # production build
npm run preview   # preview production build
```

## Usage Notes

- App data is mock data initialized into LocalStorage on first load.
- Use the role toggle in the header to switch between Admin and Viewer.
- CSV export is available in the transactions section.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT
