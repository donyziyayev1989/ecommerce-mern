import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Products from './pages/Products';
import SingleProduct from './pages/SingleProduct';
import Wrapper from './components/Wrapper';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Wrapper />}>
            <Route index element={<Home />} />
            <Route path='about' element={<About />} />
            <Route path='contact' element={<Contact />} />
            <Route path='blog' element={<Blog />} />
            <Route path='products' element={<Products />} />
            <Route path='products/:productId' element={<SingleProduct />} />
          </Route>
        </Routes>
        <ToastContainer position='top-center' />
      </BrowserRouter>
    </div>
  );
}

export default App;
