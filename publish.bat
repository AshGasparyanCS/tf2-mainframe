@echo off
REM ============================================================
REM  Double-click to publish your site to GitHub.
REM  Stages everything, commits, and pushes it live.
REM ============================================================

cd /d "%~dp0"

echo.
echo === Changes to publish ===
git status --short
echo.

REM Ask for a commit message; use a timestamp if you just hit Enter.
set "msg="
set /p "msg=Describe your changes (or just press Enter): "
if "%msg%"=="" set "msg=Update site (%date% %time%)"

echo.
echo Staging...
git add -A

echo Committing...
git commit -m "%msg%"

echo Pushing to GitHub...
git push

echo.
echo === Done! Your site updates in about a minute. ===
echo.
pause
