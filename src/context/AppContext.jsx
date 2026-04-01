import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { mockTransactions } from '../utils/data'
import { applyFilters } from '../utils/filters'
import {
  getHighestSpendingCategory,
  getInsights,
  getMonthlyTotals,
} from '../utils/insights'

const AppContext = createContext(null)

const defaultFilters = {
  search: '',
  category: 'All',
  type: 'All',
  sortBy: 'date-desc',
}

const storageKey = 'financehub-state'

const loadState = () => {
  const stored = localStorage.getItem(storageKey)
  if (!stored) return null

  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export const AppProvider = ({ children }) => {
  const stored = loadState()
  const [transactions, setTransactions] = useState(
    stored?.transactions || mockTransactions,
  )
  const [role, setRole] = useState(stored?.role || 'Viewer')
  const [filters, setFilters] = useState(stored?.filters || defaultFilters)
  const [navSection, setNavSection] = useState('Dashboard')
  const [openAddModal, setOpenAddModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const payload = JSON.stringify({ transactions, role, filters })
    localStorage.setItem(storageKey, payload)
  }, [transactions, role, filters])

  const categories = useMemo(() => {
    const unique = new Set(transactions.map((item) => item.category))
    return ['All', ...Array.from(unique)]
  }, [transactions])

  const filteredTransactions = useMemo(
    () => applyFilters(transactions, filters),
    [transactions, filters],
  )

  const totals = useMemo(() => getMonthlyTotals(transactions), [transactions])
  const totalBalance = totals.income - totals.expense

  const insights = useMemo(() => getInsights(transactions), [transactions])
  const highestSpending = useMemo(
    () => getHighestSpendingCategory(transactions),
    [transactions],
  )

  const addTransaction = (payload) => {
    setTransactions((prev) => [payload, ...prev])
  }

  const updateTransaction = (payload) => {
    setTransactions((prev) =>
      prev.map((item) => (item.id === payload.id ? payload : item)),
    )
  }

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id))
  }

  const value = {
    transactions,
    setTransactions,
    filteredTransactions,
    role,
    setRole,
    filters,
    setFilters,
    navSection,
    setNavSection,
    openAddModal,
    setOpenAddModal,
    categories,
    totals,
    totalBalance,
    insights,
    highestSpending,
    isLoading,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
