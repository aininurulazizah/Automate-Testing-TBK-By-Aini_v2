@echo off
title Playwright QC Runner

cd /d "%~dp0"

:menu
cls
echo =====================================
echo        Playwright QC Runner
echo =====================================
echo.
echo   [1] Run QC Tests
echo   [2] Sync Clients
echo   [3] Git Pull (Update Repo)
echo   [0] Exit
echo.
echo =====================================
echo.

set /p choice="Select an option: "

if "%choice%"=="1" goto run_qc
if "%choice%"=="2" goto sync
if "%choice%"=="3" goto git_pull
if "%choice%"=="0" goto exit
echo.
echo  Invalid option. Please try again.
timeout /t 2 >nul
goto menu

:run_qc
echo.
echo =====================================
echo   Running QC Tests...
echo =====================================
echo.
call npm run qc
echo.
echo =====================================
echo   QC Tests Finished
echo =====================================
pause
goto menu

:sync
echo.
echo =====================================
echo   Syncing Clients...
echo =====================================
echo.
call npm run qc:sync
echo.
echo =====================================
echo   Sync Finished
echo =====================================
pause
goto menu

:git_pull
echo.
echo =====================================
echo   Pulling latest changes...
echo =====================================
echo.
call git pull
echo.
echo =====================================
echo   Git Pull Finished
echo =====================================
pause
goto menu

:exit
exit