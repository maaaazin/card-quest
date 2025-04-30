import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Pages/Home.css'

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Card Quest</h1>
        <p className="description">
          A strategic multiplayer game where you try to guess your opponent's cards
          before they guess yours!
        </p>

        <div className="action-buttons">
          <Link to="/create-game" >
          <button className="action-button create">
            Create New Game
          </button>
          </Link>
          <Link to="/join-game" >
          <button className="action-button join">
            Join Existing Game
          </button>
          </Link>
        <Link to="/rules">
        <button className='action-button rules'>
          Rules
        </button>
        </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
