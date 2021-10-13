echo "%~dp0"
cd /d %~dp0 
start  python -m http.server

start "" http://localhost:8000/index.html

pause