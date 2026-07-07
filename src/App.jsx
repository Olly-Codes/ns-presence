import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import gameData from "../games.json";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [game, setGame] = useState("Animal Crossing: New Horizons");
  const base_url = "https://cdn.jsdelivr.net/gh/Olly-Codes/ns-presence@main/covers/";

  const handleSetGamePresence = async (gameName, gameData) => {

    const currentGame = gameData.filter((data) => data.name === gameName);

    try {
      await invoke("set_game_presence", {
        gameTitle: `${currentGame[0].name}`,
        largeImage: `${base_url}${currentGame[0].img}.jpg`,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleClearGamePresence = async () => {
    
    try {
      await invoke("clear_game_presence");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <main className="container">
      <Header />
      <section className="body-content">
        <div className="game-list-wrapper">
        <select 
          value={game} 
          onChange={(e) => setGame(e.target.value)}
          >
            {gameData.map(game => (
              <option key={game.name} value={game.value}>
                {game.name}
              </option>
            ))};
          </select>
        </div>
        <div className="btn-wrapper">
          <button onClick={(e) => handleSetGamePresence(game, gameData)}>Play</button>
          <button onClick={handleClearGamePresence}>Clear</button>
        </div>
      </section>
      <Footer gameCount={gameData.length}/>
    </main>
  );
}

export default App;
