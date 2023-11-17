import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import logoImage from './cimadown.jpeg';
import './Navbar.css';

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='nav'>
      <div className='flex justify-between bg-200 w-full'>
        <div className='navBar'>
          {/* Replace <h1> and <h2> with <img> */}
          <img src={logoImage} alt='Deep Notes Logo' className='navLogo' />
        </div>

                {/* Desktop Navigation Links */}
                <div className='desktop-nav-links'>
                <Link to='/Home' className='nav-link'>Home</Link>
          <Link to='/About' className='nav-link'>About Us</Link>
          <Link to='/Forums' className='nav-link'>Forums</Link>
        </div>
        
        <div className='signin'>
          {user?.displayName ? (
            <button onClick={handleSignOut}>Logout</button>
          ) : (
            <Link to='/signin'>Sign in</Link>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className='mobile-menu-icon' onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
          <div className={`bar ${isMobileMenuOpen ? 'open' : ''}`}></div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='mobile-menu'>
          <Link to='/page1'>Page 1</Link>
          <Link to='/page2'>Page 2</Link>
          <Link to='/page3'>Page 3</Link>
          <Link to='/page4'>Page 4</Link>
          <Link to='/page5'>Page 5</Link>
          <Link to='/page6'>Page 6</Link>
          <Link to='/page7'>Page 7</Link>
          <Link to='/page8'>Page 8</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;