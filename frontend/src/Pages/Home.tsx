import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e24a5e] to-[#043e78] p-8 font-['VT323']">
      <div className="w-[800px] h-auto min-h-[520px] text-center bg-gradient-to-br from-white/80 to-[#f5f5f5]/70 p-8 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
        <h1 className="text-[100px] text-[#333] mb-6 font-normal">Card Quest</h1>
        <p className="text-[1.2rem] text-[#666] leading-relaxed mb-10">
          A strategic multiplayer game where you try to guess your opponent's cards
          before they guess yours!
        </p>

        <div className="flex flex-col items-center gap-6 mb-4 text-base font-light">
          <Link to="/create-game" className="w-full max-w-[400px]">
            <button className="w-full h-[65px] px-8 py-4 rounded-lg text-[1.1rem] font-semibold text-white bg-[#2C3E50] shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 hover:transform hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-none cursor-pointer">
              Create New Game
            </button>
          </Link>
          <Link to="/join-game" className="w-full max-w-[400px]">
            <button className="w-full h-[65px] px-8 py-4 rounded-lg text-[1.1rem] font-semibold text-white bg-[#16A085] shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer hover:transform hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-none">
              Join Existing Game
            </button>
          </Link>
          <Link to="/rules" className="w-full max-w-[400px]">
            <button className="w-full h-[65px] px-8 py-4 rounded-lg text-[1.1rem] font-semibold text-white bg-[#C0392B] shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 cursor-pointer hover:transform hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] border-none">
              Rules
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
