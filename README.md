# 🔴 WordQuest — Caça-Palavras

Jogo de caça-palavras com identidade visual **preto e vermelho**, feito com Vite, React e React Router DOM.

🌐 **Site:** https://gpireseng1141.github.io/Ca-a-Palavras/

## Jogar no Android

O WordQuest pode ser instalado como aplicativo (PWA), sem precisar baixar pela Play Store:

1. Abra o site pelo **Google Chrome** no Android.
2. Toque em **Instalar no Android** no início do jogo ou abra o menu ⋮ do Chrome.
3. Escolha **Instalar app** (ou **Adicionar à tela inicial**, conforme a versão do navegador).
4. Abra o ícone WordQuest na tela inicial e jogue em tela cheia.

A instalação exige que o site esteja publicado em HTTPS. Depois da primeira abertura, o aplicativo mantém os arquivos principais em cache para ajudar no acesso quando a conexão estiver instável.

## Executar no computador

- Node.js 18 ou superior
- npm

Abra a pasta do projeto e execute `iniciar_jogo.bat`, ou rode:

```bash
npm install
npm run dev
```

## Rotas

- `/` — seleção de tema e dificuldade.
- `/jogar` — tabuleiro, cronômetro, seleção por toque ou mouse.
- `/vitoria` — pontuação e resumo da partida.

## Recursos

- Temas: Animais, Natureza, Tecnologia e Esportes.
- Dificuldades: Fácil, Médio e Difícil.
- Grade dinâmica com palavras na horizontal, vertical e diagonal, inclusive ao contrário.
- Seleção por mouse ou toque, com destaque das palavras encontradas.
- Interface adaptada a telas de celular Android.
- Instalação como aplicativo PWA e cache básico para uso offline.
- Cronômetro, progresso, dica, pontuação e botão Novo Jogo.
