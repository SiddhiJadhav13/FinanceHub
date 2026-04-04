import { Card, CardBody, Heading, HStack, Icon, Stack, Text, Button } from '@chakra-ui/react'
import { Download, FileText, Plus } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { exportTransactionsToCsv } from '../utils/csv'

const QuickActions = () => {
  const { filteredTransactions, setNavSection, setOpenAddModal } = useApp()

  return (
    <Card borderRadius="2xl" boxShadow="lg" h="100%" display="flex">
      <CardBody flex="1">
        <Stack spacing={4}>
          <HStack spacing={3} align="center">
            <Icon as={FileText} color="blue.400" />
            <div>
              <Heading size="sm">Quick Actions</Heading>
              <Text fontSize="sm" color="gray.500">
                Shortcut to key finance workflows.
              </Text>
            </div>
          </HStack>
          <Stack spacing={2}>
            <Button
              leftIcon={<Plus size={18} />}
              colorScheme="blue"
              justifyContent="flex-start"
              onClick={() => {
                setNavSection('Transactions')
                setOpenAddModal(true)
              }}
            >
              Add Transaction
            </Button>
            <Button
              leftIcon={<Download size={18} />}
              variant="outline"
              justifyContent="flex-start"
              onClick={() => exportTransactionsToCsv(filteredTransactions)}
            >
              Export Data
            </Button>
            <Button
              leftIcon={<FileText size={18} />}
              variant="ghost"
              justifyContent="flex-start"
              onClick={() => setNavSection('Analytics')}
            >
              View Reports
            </Button>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default QuickActions
