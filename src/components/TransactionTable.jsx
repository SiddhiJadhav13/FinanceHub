import {
  Badge,
  HStack,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { formatCurrency, formatDate } from '../utils/format'

const TransactionTable = ({ transactions, role, onEdit, onDelete }) => {
  const { colorMode } = useColorMode()
  const headerBg = colorMode === 'light' ? 'gray.50' : 'gray.800'
  const rowHover = colorMode === 'light' ? 'gray.50' : 'gray.700'

  return (
    <TableContainer borderRadius="2xl" borderWidth="1px">
      <Table variant="simple" size="sm">
        <Thead bg={headerBg}>
          <Tr>
            <Th>Date</Th>
            <Th>Amount</Th>
            <Th>Category</Th>
            <Th>Type</Th>
            <Th textAlign="right">Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {transactions.map((item) => (
            <Tr key={item.id} _hover={{ bg: rowHover }}>
              <Td>{formatDate(item.date)}</Td>
              <Td fontWeight="semibold">{formatCurrency(item.amount)}</Td>
              <Td>{item.category}</Td>
              <Td>
                <Badge colorScheme={item.type === 'Income' ? 'green' : 'red'}>
                  {item.type}
                </Badge>
              </Td>
              <Td textAlign="right">
                {role === 'Admin' ? (
                  <HStack spacing={2} justify="flex-end">
                    <IconButton
                      aria-label="Edit transaction"
                      icon={<FiEdit />}
                      size="xs"
                      variant="outline"
                      onClick={() => onEdit(item)}
                    />
                    <IconButton
                      aria-label="Delete transaction"
                      icon={<FiTrash2 />}
                      size="xs"
                      variant="outline"
                      colorScheme="red"
                      onClick={() => onDelete(item.id)}
                    />
                  </HStack>
                ) : (
                  <Text fontSize="xs" color="gray.400">
                    View only
                  </Text>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TransactionTable
