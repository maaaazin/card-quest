import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CardInputs {
  A: string;
  B: string;
  C: string;
  D: string;
}

const CreateGame = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardInputs>({ A: '', B: '', C: '', D: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      navigate('/game');
    } catch (err) {
      setError('Failed to create game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#043e78] to-[#032a52] p-8">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-sm p-8 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold text-white mb-4 text-center">Create Your Cards</h1>
        <p className="text-lg text-gray-200 mb-8 text-center">
          Enter four numbers between 0 and 9 that add up to exactly 20
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {Object.entries(cards).map(([card, value]) => (
              <div key={card} className="space-y-2">
                <label htmlFor={card} className="block text-white">Card {card}</label>
                <input
                  type="text"
                  id={card}
                  value={value}
                  onChange={(e) => handleCardChange(card as keyof CardInputs, e.target.value)}
                  maxLength={1}
                  placeholder="0-9"
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            ))}
          </div>

          {error && <p className="text-red-400 text-center">{error}</p>}

          <button 
            type="submit" 
            className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
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
