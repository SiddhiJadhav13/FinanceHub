import {
  Box,
  Card,
  CardBody,
  Heading,
  Icon,
  SimpleGrid,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { FiTrendingUp, FiTrendingDown, FiDollarSign } from 'react-icons/fi'
import { useApp } from '../context/AppContext'
import { formatCurrency } from '../utils/format'

const SummaryCards = () => {
  const { totals, totalBalance } = useApp()
  const { colorMode } = useColorMode()
  const isLight = colorMode === 'light'

  const cardShadow = isLight ? 'md' : 'lg'
  const cards = [
    {
      label: 'Total Balance',
      value: formatCurrency(totalBalance),
      icon: FiDollarSign,
      accent: isLight ? 'gray.700' : 'gray.200',
      bg: isLight ? 'gray.100' : 'gray.700',
    },
    {
      label: 'Total Income',
      value: formatCurrency(totals.income),
      icon: FiTrendingUp,
      accent: isLight ? 'green.600' : 'green.300',
      bg: isLight ? 'green.50' : 'green.900',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(totals.expense),
      icon: FiTrendingDown,
      accent: isLight ? 'red.600' : 'red.300',
      bg: isLight ? 'red.50' : 'red.900',
    },
  ]

  return (
    <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5}>
      {cards.map((card) => {
        return (
          <Card
            key={card.label}
            borderRadius="2xl"
            boxShadow={cardShadow}
            transition="all 0.25s ease"
            _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
          >
            <CardBody>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Text fontSize="sm" color="gray.500">
                    {card.label}
                  </Text>
                  <Heading size="lg" mt={2}>
                    {card.value}
                  </Heading>
                  <Text fontSize="xs" color="gray.400" mt={1}>
                    Updated just now
                  </Text>
                </Box>
                <Box
                  bg={card.bg}
                  borderRadius="xl"
                  p={3}
                  color={card.accent}
                >
                  <Icon as={card.icon} boxSize={6} />
                </Box>
              </Box>
            </CardBody>
          </Card>
        )
      })}
    </SimpleGrid>
  )
}

export default SummaryCards
