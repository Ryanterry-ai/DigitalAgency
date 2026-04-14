@echo off
echo Starting Digital Agency Website...
cd /d "%~dp0"
echo Installing dependencies (if needed)...
npm install
echo.
echo Starting development server...
echo Open http://localhost:3000 in your browser
echo.
npm run dev
pause
