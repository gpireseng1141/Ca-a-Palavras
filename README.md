# WordQuest — Caça-Palavras

Jogo de caça-palavras feito com Vite, React e React Router DOM.

## Requisitos
- Node.js 18 ou superior
- npm

## Como executar
1. Abra a pasta do projeto.
2. Dê dois cliques em `iniciar_jogo.bat`.
3. Na primeira execução, o arquivo instala as dependências automaticamente.
4. O Vite inicia e abre o jogo no navegador.

Também é possível executar manualmente:

```bash
npm install
npm run dev
```

## Rotas
- `/` — seleção de tema e dificuldade.
- `/jogar` — tabuleiro, cronômetro, seleção por arraste e lista de palavras.
- `/vitoria` — pontuação e resumo da partida.

## Recursos
- Temas: Animais, Natureza, Tecnologia e Esportes.
- Dificuldades: Fácil, Médio e Difícil.
- Grade gerada dinamicamente; palavras na horizontal, vertical e diagonal, inclusive ao contrário.
- Seleção por mouse ou toque, com destaque das palavras encontradas.
- Cronômetro, progresso, dica, pontuação e botão Novo Jogo.