import { useEffect, useState } from 'react'
import GameDropDown from './components/GameDropDown'
import './index.css'

function App() {
  const [games, setGames] = useState([])
  const [selectedGame, setSelectedGame] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')
  const [rpcStatus, setRpcStatus] = useState('idle')
  const [info, setInfo] = useState('')

  useEffect(() => {
    async function init() {
      const gameList = await window.nsPresence.getGames()
      setGames(gameList)
    }
    init()
  }, [])

  async function handlePlay() {
    if (!selectedGame) {
      setInfo('Please select a game first!')
      return
    }
    const result = await window.nsPresence.setActivity({ game: selectedGame, statusMessage })
    if (result.success) {
      setRpcStatus('playing')
      setInfo(`Now playing: ${selectedGame.name}`)
    } else {
      setInfo(`Error: ${result.error}`)
    }
  }

  async function handleIdle() {
    const result = await window.nsPresence.setIdle()
    if (result.success) {
      setRpcStatus('away')
      setInfo('Showing home menu.')
    } else {
      setInfo(`Error: ${result.error}`)
    }
  }

  async function handleClear() {
    const result = await window.nsPresence.clearActivity()
    if (result.success) {
      setRpcStatus('idle')
      setInfo('Status cleared.')
    } else {
      setInfo(`Error: ${result.error}`)
    }
  }

  const statusDot = {
    idle: '#555',
    playing: '#4ade80',
    away: '#facc15',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{
        background: 'var(--red)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '0.25rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{
            fontSize: '1.4rem',
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-0.5px',
          }}>
            NS Presence
          </span>
        </div>
        <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Discord Rich Presence
        </span>
      </div>

      {/* Body */}
      <div style={{
        flex: 1,
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
      }}>

        {/* Game selector card */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius)',
          padding: '1rem 1.25rem',
          border: '1px solid var(--border)',
        }}>
          <label style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            display: 'block',
            marginBottom: '0.6rem',
          }}>
            Game
          </label>
          <GameDropDown
            games={games}
            selectedGame={selectedGame}
            onSelect={setSelectedGame}
          />
        </div>

        {/* Status message card */}
        <div style={{
          background: 'var(--surface)',
          borderRadius: 'var(--radius)',
          padding: '1rem 1.25rem',
          border: '1px solid var(--border)',
        }}>
          <label style={{
            fontSize: '0.7rem',
            fontWeight: 800,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            display: 'block',
            marginBottom: '0.6rem',
          }}>
            Status
          </label>
          <input
            type="text"
            value={statusMessage}
            onChange={(e) => setStatusMessage(e.target.value)}
            placeholder="Online, achievement hunting..."
            style={{
              width: '100%',
              background: 'var(--surface-2)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.6rem 0.75rem',
              color: 'var(--text)',
              fontSize: '0.9rem',
              fontFamily: 'inherit',
              fontWeight: 600,
              outline: 'none',
            }}
          />
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={handlePlay} style={{
            flex: 1,
            background: 'var(--red)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius)',
            padding: '0.75rem',
            fontSize: '0.95rem',
            fontWeight: 800,
            fontFamily: 'inherit',
            cursor: 'pointer',
            letterSpacing: '0.5px',
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => e.target.style.background = 'var(--red-dark)'}
            onMouseLeave={e => e.target.style.background = 'var(--red)'}
          >
            Play
          </button>
          <button onClick={handleIdle} style={{
            flex: 1,
            background: 'var(--yellow)',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: 'var(--radius)',
            padding: '0.75rem',
            fontSize: '0.95rem',
            fontWeight: 800,
            fontFamily: 'inherit',
            cursor: 'pointer',
            letterSpacing: '0.5px',
            transition: 'background 0.15s',
          }}
            onMouseEnter={e => e.target.style.background = 'var(--yellow-dark)'}
            onMouseLeave={e => e.target.style.background = 'var(--yellow)'}
          >
            Idle
          </button>
          <button onClick={handleClear} style={{
            background: 'var(--surface-2)',
            color: 'var(--text-muted)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            padding: '0.75rem 1rem',
            fontSize: '0.95rem',
            fontWeight: 800,
            fontFamily: 'inherit',
            cursor: 'pointer',
            transition: 'color 0.15s',
          }}
            onMouseEnter={e => e.target.style.color = 'var(--text)'}
            onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
          >
            ✕
          </button>
        </div>

        {/* Feedback */}
        {info && (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.6rem 0.9rem',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: rpcStatus === 'playing' ? '#4ade80' : rpcStatus === 'away' ? '#facc15' : 'var(--text-muted)',
          }}>
            {info}
          </div>
        )}

        {/* RPC status indicator */}
        <div style={{
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: statusDot[rpcStatus],
            boxShadow: rpcStatus === 'playing' ? '0 0 6px #4ade80' : 'none',
            transition: 'background 0.3s',
          }} />
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            {rpcStatus === 'playing' ? 'Live' : rpcStatus === 'away' ? 'Idle' : 'Not connected'}
          </span>
        </div>

      </div>
    </div>
  )
}

export default App