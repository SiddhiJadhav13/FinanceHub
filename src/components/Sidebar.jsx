import {
  Box,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react'
import { LayoutDashboard, LineChart, Menu, Receipt } from 'lucide-react'
import { useApp } from '../context/AppContext'

const menuItems = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'Analytics', icon: LineChart },
  { label: 'Transactions', icon: Receipt },
]

const Sidebar = ({ isCollapsed, onToggle }) => {
  const { navSection, setNavSection } = useApp()
  const { colorMode } = useColorMode()
  const isLight = colorMode === 'light'
  const bg = isLight ? 'white' : 'gray.900'
  const borderColor = isLight ? 'gray.200' : 'gray.800'
  const activeBg = isLight ? 'blue.50' : 'blue.900'
  const activeColor = isLight ? 'blue.600' : 'blue.200'

  return (
    <Box
      w={isCollapsed ? '80px' : '260px'}
      transition="width 0.25s ease"
      bg={bg}
      borderRightWidth="1px"
      borderColor={borderColor}
      px={4}
      py={5}
      position="sticky"
      top={0}
      h="100vh"
    >
      <Flex align="center" justify={isCollapsed ? 'center' : 'space-between'} mb={8}>
        {!isCollapsed && (
          <Text fontWeight="bold" fontSize="lg">
            FinanceHub
          </Text>
        )}
        <IconButton
          aria-label="Toggle sidebar"
          icon={<Menu size={18} />}
          size="sm"
          variant="ghost"
          onClick={onToggle}
        />
      </Flex>
      <Stack spacing={2}>
        {menuItems.map((item) => {
          const isActive = navSection === item.label
          const buttonContent = (
            <Flex
              align="center"
              gap={3}
              px={3}
              py={2}
              borderRadius="lg"
              cursor="pointer"
              bg={isActive ? activeBg : 'transparent'}
              color={isActive ? activeColor : 'gray.500'}
              _hover={{ bg: isLight ? 'gray.50' : 'gray.800' }}
              transition="all 0.2s ease"
              onClick={() => setNavSection(item.label)}
            >
              <Icon as={item.icon} boxSize={5} />
              {!isCollapsed && <Text fontSize="sm">{item.label}</Text>}
            </Flex>
          )

          return isCollapsed ? (
            <Tooltip key={item.label} label={item.label} placement="right">
              {buttonContent}
            </Tooltip>
          ) : (
            <Box key={item.label}>{buttonContent}</Box>
          )
        })}
      </Stack>
    </Box>
  )
}

export default Sidebar
