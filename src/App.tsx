import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Program from "./pages/Program"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
    <NavBar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pages/Program" element={<Program />} />
       </Routes>
    <Footer />
    </>
  )
}

export default App
