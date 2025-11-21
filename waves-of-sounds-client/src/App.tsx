import { Route, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./components/HomeContainer"
import Program from "./components/ProgramContainer"
import News from "./components/NewsContainer"
import Volunteers from "./components/VolunteersContainer"
import About from "./components/AboutContainer"
import ArticlePage from "./components/ArticlePage"
import ArtistPage from "./components/ArtistPage"
import AdminPage from "./components/AdminPage"
import AdminRequire from "./components/AdminRequire"
import PageNotFound from "./components/404"
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  
  return (
    <ChakraProvider>
      <NavBar />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/program" element={<Program />} />
        <Route path="/news" element={<News />} />
        <Route path="/volunteers" element={<Volunteers />} />
        <Route path="/about" element={<About />} />
        <Route path="/artist/:slug" element={<ArtistPage />} />
        <Route path="/news/:slug" element={<ArticlePage />} />
        
        <Route element={<AdminRequire />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route>

        <Route path="*" element={<PageNotFound />}></Route>

      </Routes>
      <Footer />
    </ChakraProvider>
  )
}

export default App
