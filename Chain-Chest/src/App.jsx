
import { BrowserRouter, Routes, Route}  from 'react-router-dom'
import AppBar from "./components/AppBar.jsx"
import Upload from "./components/Upload.jsx"
import About from "./components/About.jsx"
import Login from "./components/Login.jsx"
import Home from "./components/Home.jsx"
import Platform from './components/platform.jsx'



function App() {
 

  return (
    <>
    <div>

   <BrowserRouter>

   <AppBar />

   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload/>} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path='/platform' element={<Platform/>}/>
     </Routes>
    

     </BrowserRouter>




    </div>
    
      
    </>
  )
}

export default App
