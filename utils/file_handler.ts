import { existsSync } from 'std/fs';
import { basename } from 'std/path';

import { DenodarseErrors } from '/utils/denodarse_errors.ts';

export async function appendToFile(filePath: string, textLines: string[]) {
  const escapedCommands = textLines.map((command) => `${command}`).join('\n');

  if (existsSync(filePath)) {
    const fileName = basename(filePath);
    try {
      const configFile = await Deno.readTextFile(filePath);
      await Deno.writeTextFile(filePath, configFile + `\n${escapedCommands}\n`);
      console.log(`The ${fileName} file was updated!`);
    } catch {
      throw DenodarseErrors.get('WRITE_FILE', fileName);
    }
  }
}
