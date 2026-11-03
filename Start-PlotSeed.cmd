@echo off
setlocal
cd /d "%~dp0"

REM Stop early when Windows extracts only this launcher from the ZIP.
if not exist "package.json" goto incomplete
if not exist "package-lock.json" goto incomplete
if not exist "src\main.jsx" goto incomplete
if not exist "server\index.js" goto incomplete

where node >nul 2>nul
if errorlevel 1 (
 echo Please install Node.js before starting PlotSeed.
 pause
 exit /b 1
)
REM Include the frontend build tools in production environments too.
if not exist "node_modules\.bin\vite.cmd" call npm ci --include=dev
if errorlevel 1 (
 pause
 exit /b 1
)
call npm run build
if errorlevel 1 (
 pause
 exit /b 1
)
echo After the server starts, open http://127.0.0.1:3001 in your browser.
echo Keep this window open while using the local website.
call npm start
pause
exit /b 0

:incomplete
echo.
echo [ERROR] The complete PlotSeed project was not extracted.
echo Right-click the ZIP and choose Extract All before running this file.
echo Keep src, server, tests and all other folders in their original structure.
echo Do not run this launcher from inside the ZIP or copy it into Temp.
echo Current folder: %CD%
pause
exit /b 1

