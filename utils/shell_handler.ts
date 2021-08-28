import { basename } from "https://deno.land/std@0.106.0/path/mod.ts";

export function getShellConfigFullPath(): string | void {
  const shellPath = Deno.env.get("SHELL");

  if (shellPath) {
    const defaultShell = basename(shellPath);
    return `${Deno.env.get("HOME")}/.${defaultShell}rc`;
  }
  return;
}
