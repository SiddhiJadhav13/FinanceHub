import {
  Card,
  CardBody,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { formatCurrency } from '../utils/format'

const TopCategories = () => {
  const { transactions } = useApp()

  const categories = useMemo(() => {
    const totals = transactions
      .filter((item) => item.type === 'Expense')
      .reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.amount
        return acc
      }, {})

    const totalSpend = Object.values(totals).reduce((sum, val) => sum + val, 0)

    return Object.entries(totals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category, amount]) => ({
        category,
        amount,
        percent: totalSpend ? Math.round((amount / totalSpend) * 100) : 0,
      }))
  }, [transactions])

  return (
    <Card borderRadius="2xl" boxShadow="lg">
      <CardBody>
        <Stack spacing={4}>
          <Heading size="sm">Top Categories</Heading>
          {categories.map((item) => (
            <HStack key={item.category} justify="space-between">
              <Stack spacing={0}>
                <Text fontWeight="semibold">{item.category}</Text>
                <Text fontSize="xs" color="gray.500">
                  {item.percent}% of spend
                </Text>
              </Stack>
              <Text fontWeight="semibold">{formatCurrency(item.amount)}</Text>
            </HStack>
          ))}
        </Stack>
      </CardBody>
    </Card>
  )
}

export default TopCategories
