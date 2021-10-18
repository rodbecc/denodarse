import { existsSync } from 'std/fs';
import { basename } from 'std/path';

import { DenodarseLogger } from '/utils/denodarse_logger.ts';

export async function appendToFile(filePath: string, textLines: string[]) {
  const escapedCommands = textLines.map((command) => `${command}`).join('\n');

  if (existsSync(filePath)) {
    const fileName = basename(filePath);
    try {
      const configFile = await Deno.readTextFile(filePath);
      await Deno.writeTextFile(filePath, configFile + `\n${escapedCommands}\n`);
      DenodarseLogger.getInfo('FILE_WRITE_SUCCESS', fileName);
    } catch {
      throw DenodarseLogger.getError('FILE_WRITE_FAIL', fileName);
    }
  }
}
