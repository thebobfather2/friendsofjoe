import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundImage from '../../src/img/bg.png';
import deepnotes from '../../src/img/deepnotes.png';
import "./Home.css";

const Home = () => {
  return (
    <header style={ HeaderStyle }>
    {/* <h1 className="main-title text-center">login / register page</h1> */}
    <img src={deepnotes} alt="DeepNote Logo" className="logo" /> 
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

export default Home