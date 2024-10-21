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


function App() {

  return (
    <>
    <NavBar />
    <Routes> 
      <Route path="/" element={<Home />} />
      <Route path="/program" element={<Program />} />
      <Route path="/news" element={<News />} />
      <Route path="/volunteers" element={<Volunteers />} />
      <Route path="/about" element={<About />} />
      <Route path="/artist/:slug" element={<ArtistPage />} />
      <Route path="/news/:slug" element={<ArticlePage />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
