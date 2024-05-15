
import { BrowserRouter, Routes, Route}  from 'react-router-dom'
import Sidebar from "./components/Sidebar.jsx"
import Upload from "./components/Upload.jsx"
import About from "./components/About.jsx"
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import Footer from "./components/Footer.jsx"




function App() {
 

  return (
    <>
    <div>

   <BrowserRouter>

   <Sidebar />

   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload/>} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
     </Routes>
    
    <Footer/>

     </BrowserRouter>




    </div>
    
      
    </>
  )
}

export default App
