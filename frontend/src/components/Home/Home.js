import React from 'react'
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const username = location.state?.username;
  return (
    <div>
      <h1>Welcome to Home page</h1>
      {username && <p>Have a Good Day <b>{username}</b> !</p>}
    </div>
  )
}

export default Home
