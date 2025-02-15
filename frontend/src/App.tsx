import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./Pages/Home";
import Rules from "./Pages/Rules";
import CreateGame from "./Pages/CreateGame";
import JoinGame from "./Pages/JoinGame";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element ={<Home />} />
        <Route path="/rules" element ={<Rules />} />
        <Route path="/create" element ={<CreateGame />} />
        <Route path="/join" element ={<JoinGame />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
