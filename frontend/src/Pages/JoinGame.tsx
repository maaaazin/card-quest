import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

const JoinGame = () => {
  const navigate = useNavigate();
  const [gameCode, setGameCode] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

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
    setConnecting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      // Simulate connecting
      setTimeout(() => setConnected(true), 3000);
    } catch (err) {
      setError('Failed to join game. Please check the game code and try again.');
      setIsLoading(false);
      setConnecting(false);
    }
  };

  const handleCancel = () => {
    setConnecting(false);
    setConnected(false);
    setGameCode('');
  };

  if (connecting) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-700 ${connected ? 'bg-gradient-to-b from-[#043e78] to-[#032a52]' : 'bg-white'}`}>
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="text-5xl font-bold text-[#053C75] tracking-widest">{gameCode}</div>
          <div className="text-xl text-[#333] text-center">Connecting...</div>
          <BounceLoader size={70} color="#053C75" speedMultiplier={1.5} />
          <button onClick={handleCancel} className="mt-6 px-8 py-3 rounded-lg bg-[#e24a5e] text-white font-semibold text-lg shadow hover:bg-[#c0392b] transition-colors">Cancel</button>
          {connected && <div className="text-green-600 text-lg font-bold mt-4">Connected! (Simulated)</div>}
        </div>
      </div>
    );
  }

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
              className="w-full max-w-[340px] min-w-[220px] p-4 text-2xl text-center border-2 border-[#ddd] rounded-md transition-colors duration-200 focus:outline-none focus:border-[#4a90e2]"
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
