@echo off
echo.
echo ========================================
echo  USER MANAGEMENT APP - Quick Start
echo ========================================
echo.
echo Make sure MongoDB is running and .env is configured!
echo.
pause

echo.
echo Checking backend dependencies...
if not exist "node_modules" (
    echo Installing backend dependencies...
    call npm install
)

echo.
echo Checking frontend dependencies...
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
)

echo.
echo ========================================
echo  Starting Services...
echo ========================================
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C in any terminal to stop services.
echo.
pause

echo.
echo [1/2] Starting Backend...
start cmd /k "npm run dev"

timeout /t 2

echo.
echo [2/2] Starting Frontend...
start cmd /k "npm run client"

echo.
echo ========================================
echo  Services Starting...
echo ========================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
echo All windows will open in new terminals.
echo Close them to stop the services.
echo.
pause
