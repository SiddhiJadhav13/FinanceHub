import { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from '@chakra-ui/react'
import { FiDownload, FiPlus, FiSearch } from 'react-icons/fi'
import { useApp } from '../context/AppContext'
import { exportTransactionsToCsv } from '../utils/csv'
import EmptyState from './EmptyState'
import SectionHeader from './SectionHeader'
import TransactionForm from './TransactionForm'
import TransactionTable from './TransactionTable'

const TransactionsSection = () => {
  const {
    filteredTransactions,
    role,
    filters,
    setFilters,
    categories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    openAddModal,
    setOpenAddModal,
  } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)

  const handleSave = (payload) => {
    if (editing) {
      updateTransaction({ ...payload, id: editing.id })
    } else {
      addTransaction({ ...payload, id: `t-${Date.now()}` })
    }
    setShowForm(false)
    setEditing(null)
  }

  const handleEdit = (item) => {
    setEditing(item)
    setShowForm(true)
  }

  const handleClose = () => {
    setShowForm(false)
    setEditing(null)
    setOpenAddModal(false)
  }

  useEffect(() => {
    if (openAddModal && role === 'Admin') {
      setShowForm(true)
    }
  }, [openAddModal, role])

  return (
    <Stack spacing={4}>
      <SectionHeader
        title="Transactions"
        subtitle="Search, filter, and sort your latest activity."
        actions={
          <>
            <Button
              leftIcon={<FiDownload />}
              variant="outline"
              onClick={() => exportTransactionsToCsv(filteredTransactions)}
            >
              Export CSV
            </Button>
            {role === 'Admin' && (
              <Button
                leftIcon={<FiPlus />}
                colorScheme="blue"
                onClick={() => setShowForm(true)}
              >
                Add Transaction
              </Button>
            )}
          </>
        }
      />
      <Card borderRadius="2xl" boxShadow="lg">
        <CardBody>
          <Stack spacing={4}>
            <HStack spacing={3} wrap="wrap">
              <InputGroup maxW="240px">
                <InputLeftElement pointerEvents="none">
                  <FiSearch />
                </InputLeftElement>
                <Input
                  placeholder="Search"
                  value={filters.search}
                  onChange={(event) =>
                    setFilters((prev) => ({
                      ...prev,
                      search: event.target.value,
                    }))
                  }
                />
              </InputGroup>
              <Select
                maxW="200px"
                value={filters.category}
                onChange={(event) =>
                  setFilters((prev) => ({
                    ...prev,
                    category: event.target.value,
                  }))
                }
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              <Select
                maxW="200px"
                value={filters.type}
                onChange={(event) =>
                  setFilters((prev) => ({ ...prev, type: event.target.value }))
                }
              >
                {['All', 'Income', 'Expense'].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <Select
                maxW="220px"
                value={filters.sortBy}
                onChange={(event) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: event.target.value,
                  }))
                }
              >
                <option value="date-desc">Newest first</option>
                <option value="date-asc">Oldest first</option>
                <option value="amount-desc">Amount high to low</option>
                <option value="amount-asc">Amount low to high</option>
              </Select>
            </HStack>
            {filteredTransactions.length === 0 ? (
              <EmptyState
                title="No transactions yet"
                description="Add income or expenses to see your timeline here."
              />
            ) : (
              <TransactionTable
                transactions={filteredTransactions}
                role={role}
                onEdit={handleEdit}
                onDelete={deleteTransaction}
              />
            )}
          </Stack>
        </CardBody>
      </Card>
      <Modal isOpen={showForm && role === 'Admin'} onClose={handleClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editing ? 'Edit Transaction' : 'Add Transaction'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TransactionForm editing={editing} onSave={handleSave} />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  )
}

export default TransactionsSection
