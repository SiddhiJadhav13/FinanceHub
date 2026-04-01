export const exportTransactionsToCsv = (transactions) => {
  const headers = ['Date', 'Amount', 'Category', 'Type']
  const rows = transactions.map((item) => [
    item.date,
    item.amount,
    item.category,
    item.type,
  ])

  const csvContent = [headers, ...rows]
    .map((row) => row.map((cell) => `"${cell}"`).join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'transactions.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
