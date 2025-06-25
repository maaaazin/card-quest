import { useState } from "react"

export default function Game() {
  const [myCards] = useState([
    { id: 1, number: 7, label: "A" },
    { id: 2, number: 3, label: "B" },
    { id: 3, number: 12, label: "C" },
    { id: 4, number: 9, label: "D" },
  ])

  const [opponentCards] = useState([
    { id: 5, hidden: true, label: "A" },
    { id: 6, hidden: true, label: "B" },
    { id: 7, hidden: true, label: "C" },
    { id: 8, hidden: true, label: "D" },
  ])

  const [selectedMyCards, setSelectedMyCards] = useState<string[]>([])
  const [selectedOpponentCards, setSelectedOpponentCards] = useState<string[]>([])
  const [gameLog, setGameLog] = useState<string[]>([])
  const [round, setRound] = useState(1)

  const toggleMyCard = (label: string) => {
    setSelectedMyCards((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]))
  }

  const toggleOpponentCard = (label: string) => {
    setSelectedOpponentCards((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]))
  }

  const makeGuess = () => {
    if (selectedMyCards.length === 0 || selectedOpponentCards.length === 0) return

    let logEntry = ""

    if (selectedMyCards.length === 1 && selectedOpponentCards.length === 1) {
      // Direct comparison
      const myCard = myCards.find((c) => c.label === selectedMyCards[0])
      const comparison = myCard!.number > 6 ? "greater than" : "less than" // Mock comparison
      logEntry = `Round ${round}: Maazin's ${selectedMyCards[0]} card is ${comparison} Opponent's ${selectedOpponentCards[0]} card`
    } else {
      // Sum comparison
      const mySum = selectedMyCards.reduce((sum, label) => {
        const card = myCards.find((c) => c.label === label)
        return sum + (card?.number || 0)
      }, 0)

      const comparison = mySum > 15 ? "greater than" : "less than" // Mock comparison
      logEntry = `Round ${round}: Maazin's ${selectedMyCards.join(" and ")} cards are ${comparison} Opponent's ${selectedOpponentCards.join(" and ")} cards`
    }

    setGameLog((prev) => [...prev, logEntry])
    setSelectedMyCards([])
    setSelectedOpponentCards([])
    setRound((prev) => prev + 1)
  }

  const compare = () => {
    // Similar logic but for comparison action
    makeGuess()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#043e78] to-[#032a52] flex items-center justify-center p-4 gap-6">
      {/* Game Table */}
      <div className="relative w-full max-w-4xl h-[600px] bg-slate-800 rounded-3xl shadow-2xl border-8 border-slate-900">
        <div className="absolute inset-4 bg-slate-700 rounded-2xl shadow-inner">
          {/* Opponent's Cards (Top) */}
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-3">
              {opponentCards.map((card) => (
                <div
                  key={card.id}
                  className={`w-16 h-24 bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg shadow-lg border-2 cursor-pointer transition-all duration-200 hover:scale-105 transform rotate-180 ${
                    selectedOpponentCards.includes(card.label)
                      ? "border-yellow-400 shadow-yellow-400/50"
                      : "border-blue-700"
                  }`}
                  onClick={() => toggleOpponentCard(card.label)}
                >
                  
                    {/* Card label on back */}
                    <div className="absolute top-1 left-1 text-xs font-bold text-blue-300 transform rotate-180">
                      {card.label}
                    </div>
                    
                </div>
              ))}
            </div>
            <div className="text-center mt-2 text-white/70 text-sm font-medium">Opponent</div>
          </div>

          {/* My Cards (Bottom) */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="text-center mb-2 text-white/70 text-sm font-medium">Your Cards</div>
            <div className="flex gap-4">
              
            </div>
          </div>

          {/* Game Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            
          </div>

          {/* Game Info */}
          <div className="absolute top-4 left-4 bg-black/20 rounded-lg p-3 text-white">
            <div className="text-sm font-medium">Round {round}</div>
            <div className="text-xs opacity-75">Your turn</div>
          </div>

          {/* Selection Info */}
          <div className="absolute top-4 right-4 bg-black/20 rounded-lg p-3 text-white text-xs">
            <div>My Cards: {selectedMyCards.join(", ") || "None"}</div>
            <div>Opponent: {selectedOpponentCards.join(", ") || "None"}</div>
          </div>
        </div>
      </div>

      {/* Game Log */}
      <div className="w-80 h-[600px] bg-slate-800 rounded-2xl shadow-2xl border-4 border-slate-900 p-4">
        <h3 className="text-white font-bold text-lg mb-4 text-center">Game Log</h3>
        {gameLog}
        
      </div>
    </div>
  )
}
