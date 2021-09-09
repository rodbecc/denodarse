#!/usr/bin/env zsh

# Use colors, but only if connected to a terminal
# and that terminal supports them.

local -a RAINBOW
local RESET

if [ -t 1 ]; then
  RAINBOW=(
    "$(printf '\033[38;5;196m')"
    "$(printf '\033[38;5;202m')"
    "$(printf '\033[38;5;226m')"
    "$(printf '\033[38;5;082m')"
    "$(printf '\033[38;5;021m')"
    "$(printf '\033[38;5;093m')"
    "$(printf '\033[38;5;163m')"
    "$(printf '\033[38;5;196m')"
    "$(printf '\033[38;5;202m')"
  )
  RESET=$(printf '\033[0m')
fi

printf '%s·▄▄▄▄  %s▄▄▄ .%s ▐ ▄ %s      %s·▄▄▄▄  %s ▄▄▄· %s▄▄▄  %s.▄▄ · %s▄▄▄ . %s\n' $RAINBOW $RESET
printf '%s██▪ ██ %s▀▄.▀·%s•█▌▐█%s▪     %s██▪ ██ %s▐█ ▀█ %s▀▄ █·%s▐█ ▀. %s▀▄.▀· %s\n' $RAINBOW $RESET
printf '%s▐█· ▐█▌%s▐▀▀▪▄%s▐█▐▐▌%s ▄█▀▄ %s▐█· ▐█▌%s▄█▀▀█ %s▐▀▀▄ %s▄▀▀▀█▄%s▐▀▀▪▄ %s\n' $RAINBOW $RESET
printf '%s██. ██ %s▐█▄▄▌%s██▐█▌%s▐█▌.▐▌%s██. ██ %s▐█ ▪▐▌%s▐█•█▌%s▐█▄▪▐█%s▐█▄▄▌ %s\n' $RAINBOW $RESET
printf '%s▀▀▀▀▀• %s ▀▀▀ %s▀▀ █▪%s ▀█▄▀▪%s▀▀▀▀▀• %s ▀  ▀ %s.▀  ▀%s ▀▀▀▀ %s ▀▀▀  %s\n' $RAINBOW $RESET
printf '\n'
