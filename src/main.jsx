import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles.css'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register(
        `${import.meta.env.BASE_URL}sw.js`,
        { scope: import.meta.env.BASE_URL, updateViaCache: 'none' }
      )

      // Verifica atualizações ao abrir o jogo e sempre que o usuário voltar à aba.
      await registration.update()
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') registration.update().catch(console.error)
      })
      window.addEventListener('focus', () => registration.update().catch(console.error))

      // Quando uma versão nova assume o controle, recarrega automaticamente uma única vez.
      let refreshing = false
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return
        refreshing = true
        window.location.reload()
      })
    } catch (error) {
      console.error('Não foi possível atualizar o WordQuest:', error)
    }
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/Ca-a-Palavras">
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
