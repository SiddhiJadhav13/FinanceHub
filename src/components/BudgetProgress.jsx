import {
  Card,
  CardBody,
  Heading,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { formatCurrency } from '../utils/format'

const budgetLimits = {
  Groceries: 800,
  Dining: 500,
  Shopping: 900,
  Transport: 300,
}

const BudgetProgress = () => {
  const { transactions } = useApp()

  const budgets = useMemo(() => {
    const expenseTotals = transactions
      .filter((item) => item.type === 'Expense')
      .reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.amount
        return acc
      }, {})

    return Object.entries(budgetLimits).map(([category, limit]) => {
      const spent = expenseTotals[category] || 0
      const percent = Math.min(Math.round((spent / limit) * 100), 100)
      return { category, spent, limit, percent }
    })
  }, [transactions])

  return (
    <Card borderRadius="2xl" boxShadow="lg">
      <CardBody>
        <Stack spacing={4}>
          <Heading size="sm">Budget Progress</Heading>
          {budgets.map((item) => (
            <Stack key={item.category} spacing={2}>
              <Text fontWeight="semibold">{item.category}</Text>
              <Progress value={item.percent} borderRadius="full" />
              <Text fontSize="xs" color="gray.500">
                {formatCurrency(item.spent)} of {formatCurrency(item.limit)} used
              </Text>
            </Stack>
          ))}
        </Stack>
      </CardBody>
    </Card>
  )
}

export default BudgetProgress
