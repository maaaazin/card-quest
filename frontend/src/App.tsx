import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from "./Pages/Home";
import Rules from "./Pages/Rules";
import CreateGame from "./Pages/CreateGame";
import JoinGame from "./Pages/JoinGame";
import Game from './Pages/Game';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="/create-game" element={<CreateGame />} />
          <Route path="/join-game" element={<JoinGame />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
