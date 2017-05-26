@echo off
TITLE auto-update-npm-package
SET filename=auto-update-npm-package.txt
call npm outdated > %filename%
color 0a
type %filename%
REM travel package
for /f %%a in (%filename%) do (echo %%a && npm install %%a)