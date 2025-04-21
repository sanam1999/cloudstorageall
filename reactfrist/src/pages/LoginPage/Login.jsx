

import React from 'react';
import './Login.css';




const Login = () => {

  const handleLogin = () => {
    window.open('http://localhost:3001/auth/google', '_self');
  };

  return (
    <div className="login-container">

      <div className="login-box">
        <div className="login-left">
          <h2>Welcome to CloudStorage</h2>
          <p>Get started - it's free.</p>

          <button className="google-btn" onClick={handleLogin}> SIGN UP WITH GOOGLE</button>
          <p className="terms">
            By signing up, you indicate that you have read, understood and agree to
            Cloudinary’s <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
          </p>
        </div>
        <div className="login-right">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIfQgkvet2bzIAC0hlMopA61o1Ey-_LvZNZg&s" alt="" />
        
        </div>
      </div>
    </div>
  );
};

export default Login;
