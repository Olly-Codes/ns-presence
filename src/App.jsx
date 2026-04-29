import { useEffect, useState } from 'react'
import gameDropDown from './components/gameDropDown'

function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [rpcStatus, setRpcStatus] = useState("idle");
  const [info, setInfo] = useState("");

  useEffect(() => {
    async function init() {
      const gameList = await window.ns-presence.getGames();
      setGames(gameList);

      const savedState = await window.ns-presence.getSavedState();
      if (savedState.lastGame) setSelectedGame(savedState.lastGame);
      if (savedState.lastStatus) setStatusMessage(savedState.lastStatus);
    }
    init()
  }, []);

  return (
    <div>
      <h1>NS-Presence</h1>

      <gameDropDown 
        games = {games}
        selectedGame = {selectedGame}
        onSelect = {setSelectedGame}
      />

      <div>
        <label>Custom Status Message</label>
        <input 
          type="text"
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
          placeholder="Achievement Hunting!"
          />
      </div>

      <div>
        <button onClick={handlePlay} disabled={rpcStatus === "playing"}>
          Play
        </button>
        <button onClick={handleIdle} disabled={rpcStatus === "away"}>
          Idle
        </button>
        <button onClick={handleClear}>
          Clear
        </button>
      </div>

      {info && (
        <p style={{color: rpcStatus === "playing" ? "green" : "grey"}}>
          {info}
        </p>
      )}

      <p>
        RPC State: {rpcStatus}
      </p>
    </div>
  )
}

export default App
