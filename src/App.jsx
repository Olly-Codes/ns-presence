import { useEffect, useState } from 'react'
import GameDropDown from './components/GameDropDown'

function App() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [rpcStatus, setRpcStatus] = useState("idle");
  const [info, setInfo] = useState("");

  useEffect(() => {
    async function init() {
      const gameList = await window.nsPresence.getGames();
      setGames(gameList);
    }
    init()
  }, []);

  async function handlePlay() {
    if (!selectedGame) {
      setInfo("Please select a game first!");
      return;
    }

    const result = await window.nsPresence.setActivity({
      game: selectedGame,
      statusMessage
    })

    if (result.success) {
      setRpcStatus("playing");
      setInfo(`Now Showing: ${selectedGame.name}`);
    } else {
      setInfo(`Error: ${result.error}`);
    }
  }

  async function handleIdle() {
    const result = await window.nsPresence.setIdle()
    if (result.success) {
      setRpcStatus("away");
      setInfo("Showing home menu on idle status.");
    } else {
      setInfo(`Error: ${result.error}`);
    }
  }

  async function handleClear() {
    const result = await window.nsPresence.clearActivity();
    if (result.success) {
      setRpcStatus("idle");
      setInfo("Status cleared");
    } else {
      setInfo(`Error: ${result.error}`);
    }
  }

  return (
    <div>
      <h1>nsPresence</h1>

      <GameDropDown 
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
        <button onClick={handlePlay}>
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
