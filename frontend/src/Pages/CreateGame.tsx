import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { BounceLoader } from 'react-spinners';

interface CardInputs {
  A: string;
  B: string;
  C: string;
  D: string;
}

const getRandomCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const CreateGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardInputs>({ A: '', B: '', C: '', D: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showCode, setShowCode] = useState(false);
  const [gameCode, setGameCode] = useState('');
  const [opponentConnected, setOpponentConnected] = useState(false);
  const [showRadial, setShowRadial] = useState(false);
  const radialTimeout = useRef<number | null>(null);

  const handleCardChange = (card: keyof CardInputs, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    setCards(prev => ({
      ...prev,
      [card]: value
    }));
  };

  const validateCards = (): boolean => {
    // Check if all cards have values
    if (Object.values(cards).some(value => value === '')) {
      setError('Please fill in all cards');
      return false;
    }

    // Check if all numbers are between 0-9
    if (Object.values(cards).some(value => parseInt(value) < 0 || parseInt(value) > 9)) {
      setError('Numbers must be between 0 and 9');
      return false;
    }

    // Check if sum is exactly 20
    const sum = Object.values(cards).reduce((acc, val) => acc + parseInt(val), 0);
    if (sum !== 20) {
      setError('Sum of all cards must be exactly 20');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateCards()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGameCode(getRandomCode());
      setShowCode(true);
      setIsLoading(false);
      // Simulate waiting for opponent
      setTimeout(() => {
        setOpponentConnected(true);
        setShowRadial(true);
        // Hide loader after radial reveal
        radialTimeout.current = setTimeout(() => {
          setShowRadial(false);
        }, 2000);
      }, 3000);
    } catch (err) {
      setError('Failed to create game. Please try again.');
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setShowCode(false);
    setOpponentConnected(false);
    setCards({ A: '', B: '', C: '', D: '' });
    setShowRadial(false);
    if (radialTimeout.current) clearTimeout(radialTimeout.current);
  };

  if (showCode) {
    return (
      <div className={`min-h-screen flex flex-col items-center justify-center relative transition-colors duration-700 ${opponentConnected ? 'bg-gradient-to-b from-[#043e78] to-[#032a52]' : 'bg-gradient-to-br from-[#e24a5e] to-[#043e78]'}`}>
        {/* Radial reveal overlay */}
        {showRadial && (
          <div className="radial-reveal bg-gradient-to-b from-[#043e78] to-[#032a52]"></div>
        )}
        <div className="flex flex-col items-center justify-center gap-8 z-20">
          <div className="text-5xl font-bold text-[#053C75] tracking-widest">{gameCode}</div>
          <div className="text-xl text-[#333] text-center">Share this code with your opponent to join the game</div>
          {!showRadial && <BounceLoader size={70} color="#053C75" speedMultiplier={1.5} />}
          <button onClick={handleCancel} className="mt-6 px-8 py-3 rounded-lg bg-[#e24a5e] text-white font-semibold text-lg shadow hover:bg-[#c0392b] transition-colors">Cancel</button>
          {opponentConnected && !showRadial && <div className="text-green-600 text-lg font-bold mt-4">Opponent Connected! (Simulated)</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e24a5e] to-[#043e78] p-8 font-['VT323']">
      <div className="w-3xl h-auto min-h-2xl text-center bg-gradient-to-br from-white/80 to-[#f5f5f5]/70 p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        <h1 className="text-[60px] text-[#333] mb-6 font-normal">Create Your Cards</h1>
        <p className="text-[1.2rem] text-[#666] leading-relaxed mb-8">
          Enter four numbers between 0 and 9 that add up to exactly 20
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(cards).map(([card, value]) => (
              <div key={card} className="space-y-2">
                <label htmlFor={card} className="block text-[#333] text-xl">Card {card}</label>
                <input
                  type="text"
                  id={card}
                  value={value}
                  onChange={(e) => handleCardChange(card as keyof CardInputs, e.target.value)}
                  maxLength={1}
                  placeholder="0-9"
                  className="w-full p-4 bg-white/70 border-2 border-[#ddd] rounded-lg text-[#333] text-2xl text-center placeholder-gray-400 focus:outline-none focus:border-[#4a90e2] transition-colors duration-200"
                />
              </div>
            ))}
          </div>

          {error && <p className="text-[#e74c3c] text-center m-0">{error}</p>}

          <button 
            type="submit" 
            className="w-full h-[65px] px-8 py-4 rounded-lg text-[1.1rem] font-semibold text-white bg-[#2C3E50] shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-none cursor-pointer disabled:bg-[#ccc] disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Game...' : 'Create Game'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGame;
