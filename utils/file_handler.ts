import { existsSync } from "../deps.ts";
import { basename } from "../deps.ts";

export async function appendToFile(filePath: string, commands: string[]) {
  const escapedCommands = commands.map((command) => `${command}`).join("\n");

  if (existsSync(filePath)) {
    const fileName = basename(filePath);
    try {
      const configFile = await Deno.readTextFile(filePath);
      await Deno.writeTextFile(filePath, configFile + `\n${escapedCommands}\n`);
      console.log(`O arquivo ${fileName} foi atualizado com sucesso`);
    } catch {
      console.log(`Ocorreu um erro ao escrever no arquivo ${fileName}`);
    }
  }
}
