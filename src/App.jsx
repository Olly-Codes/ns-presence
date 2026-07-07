import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const handleSetGamePresence = async () => {

    try {
      await invoke("set_game_presence", {
        gameTitle: "Mario Kart 8: Deluxe Edition",
        largeImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co213q.webp",
        smallImage: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4qsz.webp"
      });
      console.log("Presence set!");
    } catch (err) {
      console.log(`Failed to set presence: ${err}`);
    }
  }

  const handleClearGamePresence = async () => {
    
    try {
      await invoke("clear_game_presence");
      console.log("Presence cleared!");
    } catch (err) {
      console.log(`Failed to clear presence: ${err}`);
    }
  }

  return (
    <main className="container">
      <button onClick={handleSetGamePresence}>Play</button>
      <button onClick={handleClearGamePresence}>Clear</button>
    </main>
  );
}

export default App;
