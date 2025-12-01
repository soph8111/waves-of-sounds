import { Route, Routes } from "react-router-dom"
import NavBar from "./components/layout/NavBar"
import Footer from "./components/layout/Footer"
import Home from "./pages/HomePage"
import Program from "./pages/ProgramPage"
import News from "./pages/NewsPage"
import Volunteers from "./pages/VolunteersPage"
import About from "./pages/AboutPage"
import ArticlePage from "./pages/ArticlePage"
import ArtistPage from "./pages/ArtistPage"
import AdminPage from "./pages/AdminPage"
import AdminRequire from "./components/admin/AdminRequire"
import PageNotFound from "./pages/PageNotFound"
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
