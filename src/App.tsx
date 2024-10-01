import { ChakraProvider } from '@chakra-ui/react'
import FrontPage from "./components/FrontPage"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"

function App() {

  return (
  <ChakraProvider>
    <NavBar />
    
    <FrontPage />
    <Footer />
  </ChakraProvider>

  )
}

export default App
