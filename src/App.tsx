import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./components/HomeContainer"
import Program from "./components/ProgramContainer"
import { Route, Routes } from "react-router-dom"
import News from "./components/NewsContainer"
import Volunteers from "./components/VolunteersContainer"
import About from "./components/AboutContainer"

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
    </Routes>
    <Footer />
    </>
  )
}

export default App
