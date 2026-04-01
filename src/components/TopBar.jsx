import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  HStack,
  IconButton,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { Moon, Sun } from 'lucide-react'
import { useApp } from '../context/AppContext'

const TopBar = () => {
  const { role, setRole } = useApp()
  const { colorMode, toggleColorMode } = useColorMode()
  const isLight = colorMode === 'light'

  return (
    <Box
      borderBottomWidth="1px"
      borderColor={isLight ? 'gray.200' : 'gray.800'}
      bg={isLight ? 'white' : 'gray.900'}
      px={{ base: 4, md: 6 }}
      py={{ base: 4, md: 5 }}
    >
      <Flex align="center" justify="space-between" gap={4} flexWrap="wrap">
        <Box>
          <Heading size="md">Finance Command Center</Heading>
          <Text fontSize="sm" color="gray.500">
            Modern finance overview for your business operations.
          </Text>
        </Box>
        <HStack spacing={3} wrap="wrap" justify="flex-end">
          <ButtonGroup size="sm" isAttached>
            <Button
              variant={role === 'Admin' ? 'solid' : 'outline'}
              colorScheme="blue"
              onClick={() => setRole('Admin')}
            >
              Admin
            </Button>
            <Button
              variant={role === 'Viewer' ? 'solid' : 'outline'}
              colorScheme="blue"
              onClick={() => setRole('Viewer')}
            >
              Viewer
            </Button>
          </ButtonGroup>
          <IconButton
            aria-label="Toggle color mode"
            icon={isLight ? <Moon size={18} /> : <Sun size={18} />}
            onClick={toggleColorMode}
            variant="outline"
            size="sm"
          />
        </HStack>
      </Flex>
    </Box>
  )
}

export default TopBar
