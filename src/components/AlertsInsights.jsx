import {
  Card,
  CardBody,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react'
import { AlertTriangle, Sparkles, TrendingDown } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { formatCurrency } from '../utils/format'

const AlertsInsights = () => {
  const { totals, highestSpending } = useApp()
  const hasOverspend = totals.expense > totals.income

  return (
    <Card borderRadius="2xl" boxShadow="lg">
      <CardBody>
        <Stack spacing={4}>
          <Heading size="sm">Alerts & Insights</Heading>
          <HStack spacing={3} align="flex-start">
            <Icon as={hasOverspend ? AlertTriangle : Sparkles} color={hasOverspend ? 'red.400' : 'blue.400'} />
            <Text fontSize="sm" color="gray.600">
              {hasOverspend
                ? 'Spending exceeds income this period. Consider trimming expenses.'
                : 'Healthy cashflow this period. Keep the momentum going.'}
            </Text>
          </HStack>
          {highestSpending && (
            <HStack spacing={3} align="flex-start">
              <Icon as={TrendingDown} color="orange.400" />
              <Text fontSize="sm" color="gray.600">
                Highest spending category: {highestSpending[0]} ({formatCurrency(highestSpending[1])}).
              </Text>
            </HStack>
          )}
        </Stack>
      </CardBody>
    </Card>
  )
}

export default AlertsInsights
