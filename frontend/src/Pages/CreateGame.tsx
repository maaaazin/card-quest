import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Pages/CreateGame.css';

interface CardInputs {
  A: string;
  B: string;
  C: string;
  D: string;
}

const CreateGame: React.FC = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState<CardInputs>({ A: '', B: '', C: '', D: '' });
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCardChange = (card: keyof CardInputs, value: string) => {
    // Only allow numbers
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
      // TODO: Implement game creation API call
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/game'); // Navigate to game page after creation
    } catch (err) {
      setError('Failed to create game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-game-container">
      <h1>Create Your Cards</h1>
      <p className="instructions">
        Enter four numbers between 0 and 9 that add up to exactly 20
      </p>

      <form onSubmit={handleSubmit} className="card-form">
        <div className="card-inputs">
          {Object.entries(cards).map(([card, value]) => (
            <div key={card} className="card-input-group">
              <label htmlFor={card}>Card {card}</label>
              <input
                type="text"
                id={card}
                value={value}
                onChange={(e) => handleCardChange(card as keyof CardInputs, e.target.value)}
                maxLength={1}
                placeholder="0-9"
              />
            </div>
          ))}
        </div>

        {error && <p className="error-message">{error}</p>}

        <button 
          type="submit" 
          className="create-game-button"
          disabled={isLoading}
        >
          {isLoading ? 'Creating Game...' : 'Create Game'}
        </button>
      </form>
    </div>
  );
};

export default CreateGame;
