import React from 'react'
import Gallery from './component/Gallery'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"
const App = () => {
  return (
   <>

   <div className='main-div'>
   <Gallery/>
   <ToastContainer />
   </div>
   </>
  )
}

export default App