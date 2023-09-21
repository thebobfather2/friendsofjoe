import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from '../../src/img/bg.png';
import deepnotes from '../../src/img/deepnotes.png';
import "./Home.css";
import Navbar from '../components/Navbar';

const Landing = () => {
  return (
    <header style={HeaderStyle}>
      <img src={deepnotes} alt="DeepNote Logo" className="logo" /> 
    <div className="buttons text-center">
        <Link to="/signin">
            <button className="primary-button">log in</button>
        </Link>
        <Link to="/signin">
            <button className="primary-button" id="reg_btn"><span>register </span></button>
        </Link>
    </div>
    </header>
  )
}

const HeaderStyle = {
  width: "100%",
  height: "100vh",
  background: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover"
}

export default Landing;
