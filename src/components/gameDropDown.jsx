function GameDropDown({ games, selectedGame, onSelect }) {
  function handleChange(e) {
    const game = games.find((g) => g.id === e.target.value)
    onSelect(game || null)
  }

  return (
    <select
      value={selectedGame?.id || ''}
      onChange={handleChange}
      style={{
        width: '100%',
        background: '#2e2e2e',
        border: '1px solid #3a3a3a',
        borderRadius: '8px',
        padding: '0.6rem 0.75rem',
        color: selectedGame ? '#f0f0f0' : '#888',
        fontSize: '0.9rem',
        fontFamily: 'inherit',
        fontWeight: 600,
        outline: 'none',
        cursor: 'pointer',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.75rem center',
        paddingRight: '2rem',
      }}
    >
      <option value="" disabled style={{ color: '#888' }}>Choose a game</option>
      {games.map((game) => (
        <option key={game.id} value={game.id} style={{ color: '#f0f0f0', background: '#2e2e2e' }}>
          {game.name}
        </option>
      ))}
    </select>
  )
}

export default GameDropDown