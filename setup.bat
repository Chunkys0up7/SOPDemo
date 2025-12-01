@echo off
REM ============================================================================
REM  SOP Ecosystem - Windows Setup Script
REM  Automated setup for deploying on a new Windows PC
REM ============================================================================

echo.
echo ========================================================================
echo   SOP Ecosystem - Automated Setup
echo   Pursuit Bank Standard Operating Procedures Management System
echo ========================================================================
echo.

REM Check if Node.js is installed
echo [1/5] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org/
    echo Recommended version: v18 or higher
    pause
    exit /b 1
)
echo ✓ Node.js found:
node --version
echo.

REM Check if Git is installed
echo [2/5] Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Git is not installed!
    echo Please install Git from: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✓ Git found:
git --version
echo.

REM Clone repository (if not already cloned)
echo [3/5] Setting up repository...
if exist "SOPDemo" (
    echo Repository folder already exists.
    echo Pulling latest changes...
    cd SOPDemo
    git pull origin main
) else (
    echo Cloning repository from GitHub...
    git clone https://github.com/Chunkys0up7/SOPDemo.git
    if %errorlevel% neq 0 (
        echo ERROR: Failed to clone repository!
        pause
        exit /b 1
    )
    cd SOPDemo
    echo ✓ Repository cloned successfully
)
echo.

REM Install dependencies
echo [4/5] Installing Node.js dependencies...
echo This may take a few minutes...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)
echo ✓ Dependencies installed successfully
echo.

REM Display success message and next steps
echo [5/5] Setup complete!
echo.
echo ========================================================================
echo   SUCCESS! The SOP Ecosystem is ready to use.
echo ========================================================================
echo.
echo NEXT STEPS:
echo.
echo   1. Start the server:
echo      npm start
echo.
echo   2. Open your browser to:
echo      http://localhost:8080
echo.
echo   3. Explore the ecosystem:
echo      - Interactive Graph (78 nodes, D3.js visualization)
echo      - Impact Analysis (change propagation viewer)
echo      - Component Library (browse reusable components)
echo      - Workspace, Search, and Contribution tools
echo.
echo OPTIONAL - Build SOPs:
echo   npm run build
echo.
echo ========================================================================
echo.
echo Press any key to start the server now, or close this window to exit.
pause >nul

REM Start the server
echo.
echo Starting server...
call npm start
