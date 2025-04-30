import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Pages/JoinGame.css';

const JoinGame: React.FC = () => {
  const navigate = useNavigate();
  const [gameCode, setGameCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGameCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow alphanumeric characters
    const value = e.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setGameCode(value.toUpperCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!gameCode) {
      setError('Please enter a game code');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implement game joining API call
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/game'); // Navigate to game page after joining
    } catch (err) {
      setError('Failed to join game. Please check the game code and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="join-game-container">
      <h1>Join a Game</h1>
      <p className="instructions">
        Enter the game code to join an existing game
      </p>

      <form onSubmit={handleSubmit} className="join-form">
        <div className="game-code-input">
          <input
            type="text"
            value={gameCode}
            onChange={handleGameCodeChange}
            placeholder="Enter game code"
            maxLength={6}
            autoFocus
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button 
          type="submit" 
          className="join-game-button"
          disabled={isLoading}
        >
          {isLoading ? 'Joining Game...' : 'Join Game'}
        </button>
      </form>
    </div>
  );
};

export default JoinGame;
