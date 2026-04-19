import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Myorders from './pages/myorders/Myorders';

function App() {
  const [showLogin , setshowLogin ]=useState(false)
  return (
    <>
{showLogin && <LoginPopup setShowLogin={setshowLogin} />}
<div className='app'>
      <Navbar setShowLogin={setshowLogin} />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/Order" element={<PlaceOrder/>} />
        <Route path='/myorders' element={<Myorders/>}/>
      </Routes>

    </div>
    <Footer/>
    </>
  );
}

export default App;


