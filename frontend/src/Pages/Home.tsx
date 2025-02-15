import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1 className="home">[Game Name]</h1>
      <Link to="/create">
      <button>Create Game</button>
      </Link>
      <Link to="/join">
      <button>Join Game</button>
      </Link>
      <Link to="/rules">
      <button>Rules</button>
      </Link>
    </div>
  )
}

export default Home
