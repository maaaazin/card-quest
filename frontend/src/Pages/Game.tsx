import React, { useState } from 'react';
import '../styles/Pages/Game.css';

interface GameState {
  isMyTurn: boolean;
  gameHistory: string[];
  gameStatus: 'playing' | 'won' | 'lost';
}

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    isMyTurn: true,
    gameHistory: [],
    gameStatus: 'playing'
  });

  const [guessType, setGuessType] = useState<'single' | 'sum'>('single');
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [selectedCard2, setSelectedCard2] = useState<string>('');
  const [guessValue, setGuessValue] = useState<string>('');

  const handleGuessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let guessMessage = '';
    if (guessType === 'single') {
      guessMessage = `Guessed Card ${selectedCard} is ${guessValue}`;
    } else {
      guessMessage = `Guessed sum of Cards ${selectedCard} and ${selectedCard2} is ${guessValue}`;
    }

    // TODO: Implement actual guess submission to backend
    setGameState(prev => ({
      ...prev,
      gameHistory: [...prev.gameHistory, guessMessage],
      isMyTurn: false
    }));

    // Simulate opponent's turn
    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        gameHistory: [...prev.gameHistory, "Opponent's turn..."],
        isMyTurn: true
      }));
    }, 2000);
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1>Number Guessing Game</h1>
        <div className="game-status">
          {gameState.gameStatus === 'playing' ? (
            <p className="turn-indicator">
              {gameState.isMyTurn ? "Your Turn" : "Opponent's Turn"}
            </p>
          ) : (
            <p className={`game-result ${gameState.gameStatus}`}>
              You {gameState.gameStatus === 'won' ? 'Won!' : 'Lost!'}
            </p>
          )}
        </div>
      </div>

      <div className="game-content">
        <div className="guess-section">
          <form onSubmit={handleGuessSubmit} className="guess-form">
            <div className="guess-type-selector">
              <button
                type="button"
                className={`guess-type-btn ${guessType === 'single' ? 'active' : ''}`}
                onClick={() => setGuessType('single')}
              >
                Guess Single Card
              </button>
              <button
                type="button"
                className={`guess-type-btn ${guessType === 'sum' ? 'active' : ''}`}
                onClick={() => setGuessType('sum')}
              >
                Guess Sum of Cards
              </button>
            </div>

            <div className="guess-inputs">
              {guessType === 'single' ? (
                <>
                  <select
                    value={selectedCard}
                    onChange={(e) => setSelectedCard(e.target.value)}
                    required
                  >
                    <option value="">Select Card</option>
                    <option value="A">Card A</option>
                    <option value="B">Card B</option>
                    <option value="C">Card C</option>
                    <option value="D">Card D</option>
                  </select>
                </>
              ) : (
                <>
                  <select
                    value={selectedCard}
                    onChange={(e) => setSelectedCard(e.target.value)}
                    required
                  >
                    <option value="">Select First Card</option>
                    <option value="A">Card A</option>
                    <option value="B">Card B</option>
                    <option value="C">Card C</option>
                    <option value="D">Card D</option>
                  </select>
                  <select
                    value={selectedCard2}
                    onChange={(e) => setSelectedCard2(e.target.value)}
                    required
                  >
                    <option value="">Select Second Card</option>
                    <option value="A">Card A</option>
                    <option value="B">Card B</option>
                    <option value="C">Card C</option>
                    <option value="D">Card D</option>
                  </select>
                </>
              )}

              <input
                type="number"
                value={guessValue}
                onChange={(e) => setGuessValue(e.target.value)}
                placeholder="Enter your guess"
                min="0"
                max="9"
                required
              />
            </div>

            <button
              type="submit"
              className="submit-guess-btn"
              disabled={!gameState.isMyTurn || gameState.gameStatus !== 'playing'}
            >
              Make Guess
            </button>
          </form>
        </div>

        <div className="game-history">
          <h2>Game History</h2>
          <div className="history-list">
            {gameState.gameHistory.map((entry, index) => (
              <div key={index} className="history-entry">
                {entry}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game; 