import { basename } from "std/path";

export function getShellConfigFullPath(): string {
  const shellPath = Deno.env.get("SHELL");

  if (shellPath) {
    const defaultShell = basename(shellPath);
    return `${Deno.env.get("HOME")}/.${defaultShell}rc`;
  }
  throw Error("No SHELL was found!");
}
