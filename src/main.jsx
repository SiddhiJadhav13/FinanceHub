import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import './index.css'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import theme from './theme.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <AppProvider>
        <App />
      </AppProvider>
    </ChakraProvider>
  </StrictMode>,
)
