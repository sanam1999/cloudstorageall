import React from "react";
import './footer.css';


function Footer() {
  return (
    <footer className="footer">
      {/* Footer Content */}
      <div className="footer-content">
        {/* Links Section */}
        <div className="footer-links">
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="social-media">
          <a href="#" className="social-icon">FB</a>
          <a href="#" className="social-icon">TW</a>
          <a href="#" className="social-icon">IG</a>
          <a href="#" className="social-icon">YT</a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; 2025 YourCompany. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
