import { existsSync } from "https://deno.land/std@0.106.0/fs/mod.ts";
import * as path from "https://deno.land/std@0.106.0/path/mod.ts";

function installAliases() {
  const shellConfigFilePath = getShellConfigFilePath();

  if (shellConfigFilePath) {
    const paths = Deno.args.map((arg) =>
      path
        .normalize(`${import.meta.url}/../aliases/${arg}`)
        .replace("file:", "")
    );

    const validPaths = paths.filter((path) => existsSync(path));
    const commands = validPaths.map((scriptPath) => `source ${scriptPath}`);
    appendToFile(shellConfigFilePath, commands);
  }
}

function getShellConfigFilePath(): string | void {
  const shellPath = Deno.env.get("SHELL");

  if (shellPath) {
    const [defaultShell] = shellPath.split("/").reverse();
    return `${Deno.env.get("HOME")}/.${defaultShell}rc`;
  }
  return;
}

async function appendToFile(filePath: string, commands: string[]) {
  const escapedCommands = commands.map((command) => `${command}\n`).join("");

  if (existsSync(filePath)) {
    const [fileName] = filePath.split("/").reverse();
    try {
      const configFile = await Deno.readTextFile(filePath);
      await Deno.writeTextFile(filePath, configFile + `\n${escapedCommands}\n`);
      console.log(`O arquivo ${fileName} foi atualizado com sucesso`);
    } catch {
      console.log(`Ocorreu um erro ao escrever no arquivo ${fileName}`);
    }
  }
}

installAliases();
