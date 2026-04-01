import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { useMemo } from 'react'
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { useApp } from '../context/AppContext'
import { formatCurrency } from '../utils/format'

const colors = ['#2ec4b6', '#f59e0b', '#60a5fa', '#f87171', '#a78bfa']

const Charts = () => {
  const { transactions } = useApp()
  const { colorMode } = useColorMode()
  const tooltipBg = colorMode === 'light' ? '#0b1220' : '#111827'

  const balanceTrend = useMemo(() => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    )
    let running = 0
    return sorted.map((item) => {
      running += item.type === 'Income' ? item.amount : -item.amount
      return {
        date: item.date.slice(5),
        balance: running,
      }
    })
  }, [transactions])

  const spendByCategory = useMemo(() => {
    const totals = transactions
      .filter((item) => item.type === 'Expense')
      .reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.amount
        return acc
      }, {})

    return Object.entries(totals).map(([name, value]) => ({ name, value }))
  }, [transactions])

  return (
    <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
      <Card borderRadius="2xl" boxShadow="lg">
        <CardHeader display="flex" justifyContent="space-between" alignItems="center">
          <div>
            <Heading size="md">Balance Trend</Heading>
            <Text fontSize="sm" color="gray.500" mt={1}>
              Daily running balance across transactions.
            </Text>
          </div>
          <Badge colorScheme="blue" borderRadius="full" px={3} py={1}>
            7-day view
          </Badge>
        </CardHeader>
        <CardBody pt={0}>
          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balanceTrend}>
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={12} />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    background: tooltipBg,
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="balance"
                  stroke="#2563eb"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
      <Card borderRadius="2xl" boxShadow="lg">
        <CardHeader>
          <Heading size="md">Spending by Category</Heading>
          <Text fontSize="sm" color="gray.500" mt={1}>
            Quick look at expense mix.
          </Text>
        </CardHeader>
        <CardBody pt={0}>
          <div style={{ height: '260px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={spendByCategory}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                >
                  {spendByCategory.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    background: tooltipBg,
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {spendByCategory.length === 0 && (
            <Text mt={4} textAlign="center" fontSize="sm" color="gray.400">
              Add expenses to see categories.
            </Text>
          )}
        </CardBody>
      </Card>
    </SimpleGrid>
  )
}

export default Charts
