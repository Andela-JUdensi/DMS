import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer component
 * 
 * @return {Object} - Footer component
 */
const Footer = () => (
  <div className="">
    <footer className="hermes-footer">
      <h4 className="hermes-footer-text">2017 @AJUdensi -
        <Link to="https://github.com/Andela-JUdensi/DMS" target="_blank">
          <span> Find on github</span>
        </Link>
      </h4>
    </footer>
  </div>
);

export default Footer;
