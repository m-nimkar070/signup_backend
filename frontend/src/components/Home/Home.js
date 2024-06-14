import React from "react";
import { useLocation } from "react-router-dom";
import './home.css'

const Home = () => {
  const location = useLocation();
  const username = location.state?.username;
  return (
    <div className="home-container">
      <div className="container">
        <h1>Welcome to Home page</h1>
        {username && (
          <p>
            Have a Good Day <b>{username}</b> !
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
