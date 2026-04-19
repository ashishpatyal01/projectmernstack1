import React from 'react'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/add/Add'
import List from './pages/list/List'



const App = () => {
  const  url = " http://localhost:4000"
  return (
    <div>
  
      <Navbar />
      <hr />
      <div className='app-content'>
        <Sidebar />
        <div className="page-content">
          <Routes>
            <Route path='/Add' element={<Add       url={url}/>} />
            <Route path='/List' element={<List     url={url}/>} />
          
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
