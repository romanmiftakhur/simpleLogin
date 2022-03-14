import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App