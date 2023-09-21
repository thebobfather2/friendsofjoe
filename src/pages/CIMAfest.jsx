import React from 'react';
import './About.css'; // Import your About.css for styling

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-header">CIMAfest</h1>
        <p className="about-body">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget libero ut justo vestibulum
          laoreet in et justo. Proin dictum, purus ac efficitur iaculis, dui erat fermentum augue,
          in semper elit ipsum at felis.
        </p>
        <p className="about-body">
          Vestibulum sit amet laoreet neque. Sed at quam nec massa cursus tincidunt. Etiam
          eu tincidunt velit, id semper quam. Fusce eu mi nec arcu aliquet dictum in eget nunc.
        </p>
        {/* Add more content as needed */}
      </div>
    </div>
  );
};

export default About;
