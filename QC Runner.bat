@echo off
title Playwright QC Runner

cd /d "%~dp0"

echo =====================================
echo        Playwright QC Runner
echo =====================================
echo.

npm run qc

echo.
echo =====================================
echo Finished
echo =====================================
pause