import { useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock3, Lightbulb, RotateCcw, Trophy } from 'lucide-react'
import { DIFFICULTIES, THEMES } from '../utils/wordBank.js'
import { createPuzzle, getStraightLine, lineKey } from '../utils/game.js'

const formatTime = seconds => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

export default function GamePage() {
  const location = useLocation()
  const navigate = useNavigate()
  const settings = location.state || { theme: 'animais', difficulty: 'medio' }
  const theme = THEMES[settings.theme] || THEMES.animais
  const level = DIFFICULTIES[settings.difficulty] || DIFFICULTIES.medio
  const words = useMemo(() => theme.words.slice(0, level.count), [theme, level])
  const [round, setRound] = useState(0)
  const puzzle = useMemo(() => createPuzzle(words, level.size), [words, level.size, round])
  const [found, setFound] = useState([])
  const [seconds, setSeconds] = useState(0)
  const [selection, setSelection] = useState([])
  const [dragging, setDragging] = useState(false)
  const [hint, setHint] = useState(false)
  const boardRef = useRef(null)

  useEffect(() => {
    const timer = window.setInterval(() => setSeconds(value => value + 1), 1000)
    return () => window.clearInterval(timer)
  }, [round])

  useEffect(() => {
    if (found.length === words.length) {
      const timeout = window.setTimeout(() => navigate('/vitoria', { state: { score: Math.max(100, words.length * 100 - seconds * 2), seconds, found: words.length, theme: theme.label, difficulty: level.label } }), 650)
      return () => window.clearTimeout(timeout)
    }
  }, [found, words, navigate, theme.label, level.label])

  const selectedKey = lineKey(selection)
  const foundCells = useMemo(() => {
    const keys = new Set()
    found.forEach(word => puzzle.placements[word]?.forEach(cell => keys.add(`${cell.row}-${cell.col}`)))
    return keys
  }, [found, puzzle])

  function cellFromEvent(event) {
    const cell = event.target.closest('[data-row]')
    if (!cell || !boardRef.current?.contains(cell)) return null
    return { row: Number(cell.dataset.row), col: Number(cell.dataset.col) }
  }

  function updateSelection(event) {
    if (!dragging) return
    const point = cellFromEvent(event)
    if (point && selection.length) setSelection(getStraightLine(selection[0], point))
  }

  function finishSelection() {
    if (!dragging) return
    setDragging(false)
    const selected = selection.map(({ row, col }) => puzzle.grid[row][col]).join('')
    const reversed = selected.split('').reverse().join('')
    const match = words.find(word => !found.includes(word) && (word === selected || word === reversed))
    if (match) setFound(current => [...current, match])
    setSelection([])
  }

  function startSelection(event) {
    const point = cellFromEvent(event)
    if (!point) return
    event.preventDefault()
    setDragging(true)
    setSelection([point])
  }

  function newGame() {
    setFound([]); setSeconds(0); setSelection([]); setDragging(false); setHint(false); setRound(value => value + 1)
  }

  const hintWord = words.find(word => !found.includes(word))
  const hintCells = hint && hintWord ? puzzle.placements[hintWord] : []

  return (
    <main className="page-shell game-page">
      <header className="game-topbar"><button className="back-button" onClick={() => navigate('/')}><ArrowLeft size={18} /> Sair</button><a className="brand" href="/"><span className="brand-icon"><span>W</span></span> WORD<span>QUEST</span></a><button className="new-game-button" onClick={newGame}><RotateCcw size={16} /> Novo jogo</button></header>
      <div className="game-heading"><div><span className="eyebrow">CAÇA-PALAVRAS • {level.label.toUpperCase()}</span><h1>{theme.emoji} Tema: {theme.label}</h1><p>Encontre as palavras escondidas na grade. Elas podem estar em qualquer direção!</p></div><div className="timer-card"><Clock3 size={19} /><div><small>TEMPO</small><strong>{formatTime(seconds)}</strong></div></div></div>
      <div className="game-layout">
        <section className="board-card"><div className="board-card-heading"><div><h2>Tabuleiro</h2><p>Toque, clique e arraste em linha reta</p></div><span className="progress-count">{found.length}<small> / {words.length}</small></span></div>
          <div className="progress-track"><span style={{ width: `${found.length / words.length * 100}%` }} /></div>
          <div ref={boardRef} className="letter-board" style={{ '--grid-size': level.size }} onPointerDown={startSelection} onPointerMove={updateSelection} onPointerUp={finishSelection} onPointerCancel={finishSelection}>
            {puzzle.grid.map((row, r) => row.map((letter, c) => {
              const key = `${r}-${c}`
              const isSelected = selection.some(cell => cell.row === r && cell.col === c)
              const isHint = hintCells.some(cell => cell.row === r && cell.col === c)
              return <div key={key} data-row={r} data-col={c} className={`letter-cell ${foundCells.has(key) ? 'found-cell' : ''} ${isSelected ? 'selected-cell' : ''} ${isHint ? 'hint-cell' : ''}`}>{letter}</div>
            }))}
          </div>
          <div className="board-tip"><span className="tip-dot" /> {found.length === words.length ? 'Todas encontradas!' : 'Dica: selecione a primeira e a última letra da palavra.'}</div>
        </section>
        <aside className="words-card"><div className="words-card-heading"><div><span className="eyebrow">SUA MISSÃO</span><h2>Palavras</h2></div><span className="word-total">{found.length}/{words.length}</span></div>
          <div className="word-list">{words.map(word => <div className={`word-item ${found.includes(word) ? 'word-found' : ''}`} key={word}><span className="word-status">{found.includes(word) ? '✓' : '•'}</span><span>{word}</span>{found.includes(word) && <small>ENCONTRADA</small>}</div>)}</div>
          <div className="words-actions"><button className="hint-button" onClick={() => setHint(value => !value)}><Lightbulb size={16} /> {hint ? 'Ocultar dica' : 'Dar uma dica'}</button><p>As palavras podem aparecer na horizontal, vertical e diagonal.</p></div>
          <div className="score-mini"><Trophy size={18} /><div><strong>{found.length * 100} pts</strong><small>Pontuação atual</small></div></div>
        </aside>
      </div>
      <footer className="footer">WORDQUEST <span>•</span> CONCENTRE-SE E DIVIRTA-SE</footer>
    </main>
  )
}