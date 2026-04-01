import {
  Card,
  CardBody,
  Heading,
  HStack,
  Icon,
  SimpleGrid,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { FiActivity, FiBarChart2, FiPieChart } from 'react-icons/fi'
import { useApp } from '../context/AppContext'
import { formatCurrency } from '../utils/format'

const Insights = () => {
  const { highestSpending, totals, insights } = useApp()
  const { colorMode } = useColorMode()
  const shadow = colorMode === 'light' ? 'md' : 'lg'

  return (
    <SimpleGrid columns={{ base: 1, md: 3, xl: 1 }} spacing={5}>
      <Card borderRadius="2xl" boxShadow={shadow}>
        <CardBody>
          <HStack spacing={3} align="center">
            <Icon as={FiPieChart} color="orange.400" boxSize={6} />
            <div>
              <Text fontSize="sm" color="gray.500">
                Highest spend
              </Text>
              <Heading size="sm" mt={1}>
                {highestSpending
                  ? `${highestSpending[0]} (${formatCurrency(highestSpending[1])})`
                  : 'No spending yet'}
              </Heading>
            </div>
          </HStack>
        </CardBody>
      </Card>
      <Card borderRadius="2xl" boxShadow={shadow}>
        <CardBody>
          <HStack spacing={3} align="center">
            <Icon as={FiBarChart2} color="teal.400" boxSize={6} />
            <div>
              <Text fontSize="sm" color="gray.500">
                Income vs Expense
              </Text>
              <Heading size="sm" mt={1}>
                {formatCurrency(totals.income)} / {formatCurrency(totals.expense)}
              </Heading>
            </div>
          </HStack>
        </CardBody>
      </Card>
      <Card borderRadius="2xl" boxShadow={shadow}>
        <CardBody>
          <HStack spacing={3} align="center">
            <Icon as={FiActivity} color="green.400" boxSize={6} />
            <div>
              <Text fontSize="sm" color="gray.500">
                Savings health
              </Text>
              <Heading size="sm" mt={1}>
                {insights.hasPositiveCashflow
                  ? `${insights.savingsRate}% of income saved`
                  : 'Spending exceeds income'}
              </Heading>
            </div>
          </HStack>
        </CardBody>
      </Card>
    </SimpleGrid>
  )
}

export default Insights
