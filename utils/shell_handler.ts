import { basename } from "../deps.ts";

export function getShellConfigFullPath(): string | void {
  const shellPath = Deno.env.get("SHELL");

  if (shellPath) {
    const defaultShell = basename(shellPath);
    return `${Deno.env.get("HOME")}/.${defaultShell}rc`;
  }
  return;
}
