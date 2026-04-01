import { useEffect, useState } from 'react'
import { Button, FormControl, FormLabel, Input, Select, Stack } from '@chakra-ui/react'

const initialState = {
  date: '',
  amount: '',
  category: '',
  type: 'Expense',
}

const TransactionForm = ({ onSave, editing }) => {
  const [form, setForm] = useState(initialState)

  useEffect(() => {
    if (editing) {
      setForm({
        date: editing.date,
        amount: editing.amount,
        category: editing.category,
        type: editing.type,
      })
      return
    }
    setForm(initialState)
  }, [editing])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!form.date || !form.amount || !form.category) return
    onSave({
      ...form,
      amount: Number(form.amount),
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Date</FormLabel>
          <Input type="date" name="date" value={form.date} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            min={1}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Category</FormLabel>
          <Input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="e.g. Groceries"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Select name="type" value={form.type} onChange={handleChange}>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </Select>
        </FormControl>
        <Button colorScheme="blue" type="submit">
          {editing ? 'Save Changes' : 'Add Transaction'}
        </Button>
      </Stack>
    </form>
  )
}

export default TransactionForm
