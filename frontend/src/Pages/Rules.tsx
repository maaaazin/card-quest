import React from "react";
import { Link } from "react-router-dom";

const RulesPage: React.FC = () => {
  return (
    <div className="container">
      <div className="rules-box">
        <h1 className="rules-title">RULES</h1>

        <p className="rules-text">
          Two players will each create four cards A, B, C, and D with numbers between 0 and 9 that add up to exactly 20.
          <br /><br />
          Your goal is to guess your opponent’s four cards before they guess yours.
        </p>

        <h2 className="game-flow-title">Game Flow</h2>
        <ol className="game-flow-list">
          <li>Create Your Cards</li>
          <li>Take Turns Making Guesses by asking for direct comparison of a card or sum of two cards.</li>
          <li>The game will tell you if your number(s) is equal, greater, or less than your opponent’s.</li>
          <li>Keep track of the hints you receive and narrow down their numbers. You can use a pen and paper.</li>
        </ol>

        <p className="rules-text">
          The first player to correctly guess all four numbers of their opponent wins!
        </p>

        <div className="button-container">
            <Link to= "/home" >
          <button className="play-button">PLAY</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
