import React from "react";
import "./Footer.css";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-row">
        <div className="footer-contact">
          <h3>
            Let’s Collaborate <br />
            film<span>@</span>prajwaln.com
          </h3>

          <p className="secondary">
            From short films to full productions — I’m always open to creative
            collaborations. Feel free to reach out anytime.
          </p>

          <a
            href="https://wa.me/918310294230"
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            Get in Touch
          </a>
        </div>

        {/* <div className="footer-nav">
          <Link to="/" className="footer-nav-item">
            <span>Home</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/work" className="footer-nav-item">
            <span>Work</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/about" className="footer-nav-item">
            <span>About</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/contact" className="footer-nav-item">
            <span>Contact</span>
            <span>&#8594;</span>
          </Link>

          <Link to="/faq" className="footer-nav-item">
            <span>FAQ</span>
            <span>&#8594;</span>
          </Link>
        </div> */}
      </div>
      <div className="footer-row">
        <div className="footer-header">
          <h1>Prajwal N</h1>
        </div>

        <div className="footer-copyright-line">
          <p className="primary sm">&copy; Prajwal N2025</p>
          <p className="primary sm">Made by <a href="https://starshape.in" target="_blank" rel="noopener noreferrer">starshape.in</a></p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
