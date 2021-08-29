import { existsSync } from "../deps.ts";
import { basename } from "../deps.ts";

export async function appendToFile(filePath: string, textLines: string[]) {
  const escapedCommands = textLines.map((command) => `${command}`).join("\n");

  if (existsSync(filePath)) {
    const fileName = basename(filePath);
    try {
      const configFile = await Deno.readTextFile(filePath);
      await Deno.writeTextFile(filePath, configFile + `\n${escapedCommands}\n`);
      console.log(`The ${fileName} file was updated!`);
    } catch {
      console.error(
        `An error ocurred while trying to write to ${fileName} file!`
      );
    }
  }
}
