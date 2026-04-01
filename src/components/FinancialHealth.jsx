import {
  Badge,
  Card,
  CardBody,
  Heading,
  HStack,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import { useApp } from '../context/AppContext'

const FinancialHealth = () => {
  const { totals } = useApp()

  const { status, score, colorScheme } = useMemo(() => {
    if (totals.income === 0) {
      return { status: 'Critical', score: 10, colorScheme: 'red' }
    }
    const ratio = totals.expense / totals.income
    if (ratio < 0.7) return { status: 'Good', score: 85, colorScheme: 'green' }
    if (ratio < 1) return { status: 'Warning', score: 55, colorScheme: 'orange' }
    return { status: 'Critical', score: 25, colorScheme: 'red' }
  }, [totals])

  return (
    <Card borderRadius="2xl" boxShadow="lg">
      <CardBody>
        <Stack spacing={3}>
          <HStack justify="space-between">
            <Heading size="sm">Financial Health</Heading>
            <Badge colorScheme={colorScheme} borderRadius="full" px={3}>
              {status}
            </Badge>
          </HStack>
          <Text fontSize="sm" color="gray.500">
            Based on your income vs expenses this period.
          </Text>
          <Progress value={score} colorScheme={colorScheme} borderRadius="full" />
          <Text fontSize="xs" color="gray.400">
            Score: {score}/100
          </Text>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default FinancialHealth
