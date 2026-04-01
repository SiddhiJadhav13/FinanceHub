export const applyFilters = (transactions, filters) => {
  const { search, category, type, sortBy } = filters
  let result = [...transactions]

  if (search) {
    const query = search.toLowerCase()
    result = result.filter((item) =>
      [item.category, item.type, item.date]
        .join(' ')
        .toLowerCase()
        .includes(query),
    )
  }

  if (category && category !== 'All') {
    result = result.filter((item) => item.category === category)
  }

  if (type && type !== 'All') {
    result = result.filter((item) => item.type === type)
  }

  switch (sortBy) {
    case 'date-asc':
      result.sort((a, b) => new Date(a.date) - new Date(b.date))
      break
    case 'amount-desc':
      result.sort((a, b) => b.amount - a.amount)
      break
    case 'amount-asc':
      result.sort((a, b) => a.amount - b.amount)
      break
    default:
      result.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  return result
}
