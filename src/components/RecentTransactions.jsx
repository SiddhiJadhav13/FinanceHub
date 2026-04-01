import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { formatCurrency, formatDate } from '../utils/format'

const RecentTransactions = () => {
  const { transactions, setNavSection } = useApp()

  const recentItems = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
  }, [transactions])

  return (
    <Card borderRadius="2xl" boxShadow="lg">
      <CardBody>
        <HStack justify="space-between" mb={4}>
          <Box>
            <Heading size="sm">Recent Transactions</Heading>
            <Text fontSize="sm" color="gray.500">
              Latest activity across your accounts.
            </Text>
          </Box>
          <Button size="sm" variant="outline" onClick={() => setNavSection('Transactions')}>
            View All
          </Button>
        </HStack>
        <Stack spacing={3} divider={<Divider />}>
          {recentItems.map((item) => (
            <HStack key={item.id} justify="space-between">
              <Box>
                <Text fontWeight="semibold">{item.category}</Text>
                <Text fontSize="xs" color="gray.500">
                  {formatDate(item.date)}
                </Text>
              </Box>
              <Text fontWeight="semibold">{formatCurrency(item.amount)}</Text>
            </HStack>
          ))}
        </Stack>
      </CardBody>
    </Card>
  )
}

export default RecentTransactions
