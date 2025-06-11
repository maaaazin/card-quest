import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinGame = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e24a5e] to-[#043e78] p-8 font-['VT323']">
      <div className="max-w-[500px] mx-8 p-8 bg-gradient-to-br from-white/80 to-[#f5f5f5]/70 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        <h1 className="text-center text-black text-5xl mb-4">Join a Game</h1>
        <p className="text-center text-[#666] mb-4">
          Enter the game code to join an existing game
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex justify-center">
            <input
              type="text"
              value={gameCode}
              onChange={handleGameCodeChange}
              placeholder="Enter game code"
              maxLength={6}
              autoFocus
              className="w-full max-w-[300px] p-4 text-2xl text-center tracking-[0.5rem] border-2 border-[#ddd] rounded-md transition-colors duration-200 focus:outline-none focus:border-[#4a90e2]"
            />
          </div>

          {error && <p className="text-[#e74c3c] text-center m-0">{error}</p>}

          <button 
            type="submit" 
            className="bg-[#16A085] text-white border-none p-4 rounded-md text-[1.1rem] font-semibold cursor-pointer transition-colors duration-200 hover:bg-[#1c8671] disabled:bg-[#ccc] disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Joining Game...' : 'Join Game'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinGame;
