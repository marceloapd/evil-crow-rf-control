@echo off

REM Obtém o diretório do perfil do usuário atual
set "user_dir=%USERPROFILE%\Documents"

REM Procura pela pasta evil-crow-rf-control dentro do diretório de documentos
for /d %%D in ("%user_dir%\*") do (
    if exist "%%D\evil-crow-rf-control" (
        set "evil_crow_dir=%%D\evil-crow-rf-control"
        goto :FoundEvilCrow
    )
)

echo Pasta evil-crow-rf-control não encontrada.
pause
exit /b

:FoundEvilCrow
echo Pasta evil-crow-rf-control encontrada em %evil_crow_dir%

cd /d "%evil_crow_dir%"
node index.js
