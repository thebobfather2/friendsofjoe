import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import DeepNotes from './pages/DeepNotes';
import Landing from './pages/Landing';
import Home from './pages/Home';
import About from './pages/About';
import Signin from './pages/Signin';
import Subscribe from './pages/Subscribe';

function App() {
  return (
    <div>
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Home />} />
        <Route path='/About' element={<About />} />
        <Route path='/DeepNotes' element={<DeepNotes />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/Subscribe' element={<Subscribe />} />
        <Route
          path='/account'
          element={
            <Protected>
              <Account />
            </Protected>
          }
        />
      </Routes>
    </AuthContextProvider>
  </div>
);
}

export default App;