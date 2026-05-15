@echo off
title Command Prompt Auto-Clicker
REM F6 = toggle clicking, Esc = quit
powershell -ExecutionPolicy Bypass -NoLogo -File "%~dp0clicker.ps1"

