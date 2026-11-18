import { useNavigate } from 'react-router-dom'
import { ArrowRight, Clock3, Search, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { DIFFICULTIES, THEMES } from '../utils/wordBank.js'

export default function HomePage() {
  const navigate = useNavigate()
  const [theme, setTheme] = useState('animais')
  const [difficulty, setDifficulty] = useState('medio')

  function startGame() {
    navigate('/jogar', { state: { theme, difficulty, startedAt: Date.now() } })
  }

  return (
    <main className="page-shell home-page">
      <header className="topbar"><a className="brand" href="/"><span className="brand-icon"><Search size={21} /></span> WORD<span>QUEST</span></a><span className="top-note"><Sparkles size={15} /> Treine sua mente</span></header>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">DESAFIO DE PALAVRAS</span>
          <h1>Encontre as palavras.<br /><span>Desafie sua mente.</span></h1>
          <p>Explore a grade, descubra palavras escondidas em todas as direções e tente bater seu próprio recorde.</p>
          <div className="hero-stats"><div><strong>04</strong><small>temas</small></div><i /><div><strong>03</strong><small>dificuldades</small></div><i /><div><strong>∞</strong><small>diversão</small></div></div>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="art-glow" /><div className="letter-card"><div className="letter-grid">{['P','A','L','A','V','R','A','S','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J'].map((l, i) => <span className={ [2,3,4,9,14,19].includes(i) ? 'marked' : '' } key={i}>{l}</span>)}</div><span className="floating-star">✦</span></div><div className="art-pill"><span>✦</span> Encontre todas!</div></div>
      </section>
      <section className="setup-card">
        <div className="section-heading"><div><span className="eyebrow">PREPARE-SE</span><h2>Monte seu desafio</h2></div><span className="step-label">01 <i /> 02</span></div>
        <div className="choice-block"><div className="choice-title"><span>01</span><div><h3>Escolha um tema</h3><p>Qual universo vamos explorar?</p></div></div>
          <div className="theme-grid">{Object.entries(THEMES).map(([id, item]) => <button type="button" key={id} className={`theme-option ${theme === id ? 'selected' : ''}`} onClick={() => setTheme(id)}><span className="theme-emoji">{item.emoji}</span><span>{item.label}</span><span className="choice-check">✓</span></button>)}</div>
        </div>
        <div className="choice-block difficulty-block"><div className="choice-title"><span>02</span><div><h3>Defina a dificuldade</h3><p>Escolha o nível do desafio.</p></div></div>
          <div className="difficulty-grid">{Object.entries(DIFFICULTIES).map(([id, item]) => <button type="button" key={id} className={`difficulty-option ${difficulty === id ? 'selected' : ''}`} onClick={() => setDifficulty(id)}><span className="difficulty-dot" /><strong>{item.label}</strong><small>{item.hint}</small></button>)}</div>
        </div>
        <button className="primary-button start-button" onClick={startGame}>Começar jogo <ArrowRight size={19} /></button>
        <p className="setup-footnote"><Clock3 size={14} /> O cronômetro começa assim que o jogo iniciar.</p>
      </section>
      <footer className="footer">WORDQUEST <span>•</span> UM BOM EXERCÍCIO PARA O CÉREBRO</footer>
    </main>
  )
}