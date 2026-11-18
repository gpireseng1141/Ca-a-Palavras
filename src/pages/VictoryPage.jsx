import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, Clock3, RotateCcw, Sparkles, Trophy } from 'lucide-react'

const formatTime = seconds => `${String(Math.floor((seconds || 0) / 60)).padStart(2, '0')}:${String((seconds || 0) % 60).padStart(2, '0')}`

export default function VictoryPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const result = state || { score: 0, seconds: 0, found: 0, theme: 'Animais', difficulty: 'Médio' }
  return (
    <main className="page-shell victory-page">
      <header className="topbar"><a className="brand" href="/"><span className="brand-icon"><Trophy size={20} /></span> WORD<span>QUEST</span></a><span className="top-note">FIM DE JOGO</span></header>
      <section className="victory-card"><div className="trophy-orbit"><div className="trophy-circle"><Trophy size={54} /></div><span className="orbit-star star-one">✦</span><span className="orbit-star star-two">✧</span><span className="orbit-star star-three">✦</span></div>
        <span className="eyebrow">MISSÃO CUMPRIDA</span><h1>Você conseguiu!</h1><p className="victory-description">Todas as palavras foram encontradas. Mandou muito bem!</p>
        <div className="final-score"><small>SUA PONTUAÇÃO</small><strong>{result.score.toLocaleString('pt-BR')}</strong><span>pontos</span></div>
        <div className="result-stats"><div><Clock3 size={18} /><small>Tempo</small><strong>{formatTime(result.seconds)}</strong></div><div><Sparkles size={18} /><small>Palavras</small><strong>{result.found}</strong></div><div><Trophy size={18} /><small>Nível</small><strong>{result.difficulty}</strong></div></div>
        <button className="primary-button" onClick={() => navigate('/', { replace: true })}>Jogar novamente <RotateCcw size={18} /></button>
        <Link className="home-link" to="/"><ArrowLeft size={15} /> Voltar ao início</Link>
        <span className="victory-theme">Tema concluído: {result.theme}</span>
      </section>
      <footer className="footer">WORDQUEST <span>•</span> CADA PALAVRA É UMA CONQUISTA</footer>
    </main>
  )
}