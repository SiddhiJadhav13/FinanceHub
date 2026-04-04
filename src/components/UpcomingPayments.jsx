import { Card, CardBody, Heading, HStack, Stack, Text } from '@chakra-ui/react'

const upcoming = [
  { id: 'u1', title: 'Cloud Hosting', date: 'Apr 06', amount: '₹180' },
  { id: 'u2', title: 'SaaS Subscriptions', date: 'Apr 10', amount: '₹320' },
  { id: 'u3', title: 'Office Rent', date: 'Apr 15', amount: '₹1,200' },
]

const UpcomingPayments = () => {
  return (
    <Card borderRadius="2xl" boxShadow="lg" h="100%" display="flex">
      <CardBody flex="1">
        <Stack spacing={4}>
          <Heading size="sm">Upcoming Payments</Heading>
          {upcoming.map((item) => (
            <HStack key={item.id} justify="space-between">
              <Stack spacing={0}>
                <Text fontWeight="semibold">{item.title}</Text>
                <Text fontSize="xs" color="gray.500">
                  {item.date}
                </Text>
              </Stack>
              <Text fontWeight="semibold">{item.amount}</Text>
            </HStack>
          ))}
        </Stack>
      </CardBody>
    </Card>
  )
}

export default UpcomingPayments
