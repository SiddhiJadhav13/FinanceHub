export const getHighestSpendingCategory = (transactions) => {
  const totals = transactions
    .filter((item) => item.type === 'Expense')
    .reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.amount
      return acc
    }, {})

  const entries = Object.entries(totals)
  if (!entries.length) return null

  return entries.sort((a, b) => b[1] - a[1])[0]
}

export const getMonthlyTotals = (transactions) => {
  return transactions.reduce(
    (acc, item) => {
      if (item.type === 'Income') acc.income += item.amount
      if (item.type === 'Expense') acc.expense += item.amount
      return acc
    },
    { income: 0, expense: 0 },
  )
}

export const getInsights = (transactions) => {
  const totals = getMonthlyTotals(transactions)
  const balance = totals.income - totals.expense
  const savingsRate = totals.income
    ? Math.round((balance / totals.income) * 100)
    : 0

  return {
    balance,
    savingsRate,
    hasPositiveCashflow: balance >= 0,
  }
}
