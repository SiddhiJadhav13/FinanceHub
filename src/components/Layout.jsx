import { Box, Flex, useColorMode } from '@chakra-ui/react'
import { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

const Layout = ({ children }) => {
  const { colorMode } = useColorMode()
  const isLight = colorMode === 'light'
  const [isCollapsed, setIsCollapsed] = useState(false)

  const background = isLight
    ? 'linear-gradient(135deg, #f8fafc 0%, #eef2f7 50%, #e6edf8 100%)'
    : 'linear-gradient(160deg, #0b1220 0%, #111827 50%, #0b1220 100%)'

  return (
    <Box minH="100vh" bgGradient={background}>
      <Flex minH="100vh">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed((prev) => !prev)}
        />
        <Box flex="1" display="flex" flexDirection="column">
          <TopBar />
          <Box px={{ base: 4, md: 6 }} pb={{ base: 6, md: 10 }} pt={{ base: 4, md: 6 }}>
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}

export default Layout
