import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import GamePage from './pages/GamePage.jsx'
import VictoryPage from './pages/VictoryPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jogar" element={<GamePage />} />
      <Route path="/vitoria" element={<VictoryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}