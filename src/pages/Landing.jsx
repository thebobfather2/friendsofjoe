import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from '../../src/img/bg.png';
import deepnotes from '../../src/img/deepnotes.png';
import "./Landing.css";

const Landing = () => {
  return (
    <header style={HeaderStyle}>
      <img src={deepnotes} alt="DeepNote Logo" className="logo" /> 
    <div className="buttons text-center">
        <Link to="/Home">
            <button className="primary-button">Enter</button>
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
