function GameDropDown({ games, selectedGame, onSelect }) {
    function handleChange(e) {
        const game = games.find((game) => game.id === e.target.value)
        onSelect(game || null)
    }

    return (
        <div>
            <label>Select a Game</label>
            <select
                value = {selectedGame?.id || ""}
                onChange={handleChange}
            >
                <option value = "" disabled>Choose a game</option>
                {games.map((game) => (
                    <option key={game.id} value={game.id}>
                        {game.name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default GameDropDown