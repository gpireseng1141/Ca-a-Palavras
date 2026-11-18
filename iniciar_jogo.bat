@echo off
setlocal
cd /d "%~dp0"
echo.
echo  ======================================
echo       WORD QUEST - CACA-PALAVRAS
echo  ======================================
echo.
if not exist "node_modules" (
  echo Dependencias nao encontradas. Instalando...
  call npm install
  if errorlevel 1 (
    echo.
    echo Falha ao instalar as dependencias. Verifique o Node.js e sua internet.
    pause
    exit /b 1
  )
)
echo Iniciando o jogo no navegador...
call npm run dev -- --open
pause