import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Routes } from 'react-router-dom' ;

import { Home, CreatePost } from './pages';
import Button from './components/Button';
const App = () => {
  return (
    <BrowserRouter >
      
      <header className=" backdrop-blur-md w-full flex justify-between items-center sm:px-8 px-4 py-4 border-b bg-black/90 border-b-[#e6ebf4] "  >
        <Link to="/">
          <Button/>
        </Link>
        <Link to="/create-post" className='px-4 py-2' >
          <button class="Btn">
  
            <div class="sign">+</div>  
            <div class="text">Create</div>
          </button>
        </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#000000] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
