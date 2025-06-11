import React from "react";
import { Link } from "react-router-dom";

const RulesPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e24a5e] to-[#043e78] p-8 font-['VT323']">
      <div className="w-[800px] h-auto min-h-[520px] text-center bg-gradient-to-br from-white/80 to-[#f5f5f5]/70 p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        <h1 className="text-[60px] text-[#333] mb-6 font-normal">RULES</h1>

        <p className="text-[1.2rem] text-[#666] leading-relaxed mb-8">
          Two players will each create four cards A, B, C, and D with numbers between 0 and 9 that add up to exactly 20.
          <br /><br />
          Your goal is to guess your opponent's four cards before they guess yours.
        </p>

        <h2 className="text-[30px] text-[#333] mb-4 font-normal">Game Flow</h2>
        <ol className="list-decimal list-inside text-[1.2rem] text-[#666] space-y-2 mb-8 text-left max-w-[600px] mx-auto">
          <li>Create Your Cards</li>
          <li>Take Turns Making Guesses by asking for direct comparison of a card or sum of two cards.</li>
          <li>The game will tell you if your number(s) is equal, greater, or less than your opponent's.</li>
          <li>Keep track of the hints you receive and narrow down their numbers. You can use a pen and paper.</li>
        </ol>

        <p className="text-[1.2rem] text-[#666] leading-relaxed mb-8">
          The first player to correctly guess all four numbers of their opponent wins!
        </p>

        <div className="flex justify-center">
          <Link to="/home" className="w-full max-w-[400px]">
            <button className="w-full h-[65px] px-8 py-4 rounded-lg text-[1.1rem] font-semibold text-white bg-[#C0392B] shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-none">
              PLAY
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
