import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import About from './pages/About';
import Forums from './pages/Forums';
import Charity from './pages/Charity';
import CIMAfest from './pages/CIMAfest';
import DeepNotes from './pages/DeepNotes';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Signin from './pages/Signin';
import Subscribe from './pages/Subscribe';
import TourBus from './pages/TourBus';

function App() {
  // Get the current route location
  const location = useLocation();

  // Check if the current route path is not the landing page ('/')
  const isNavbarVisible = location.pathname !== '/';

  return (
    <div>
      <AuthContextProvider>
        {isNavbarVisible && <Navbar />}
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/About' element={<About />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/Subscribe' element={<Subscribe />} />
          <Route
            path='/Forums'
            element={
              <Protected>
                <Forums />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
