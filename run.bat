echo "%~dp0"
cd /d %~dp0 
start  python -m http.server

start "" http://localhost:8000/nsdf_map3d.html

pause