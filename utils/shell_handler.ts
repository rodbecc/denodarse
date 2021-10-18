import { basename } from 'std/path';

import { DenodarseLogger } from '/utils/denodarse_logger.ts';

export function getShellConfigFullPath(): string {
  const shellPath = Deno.env.get('SHELL');

  if (shellPath) {
    const defaultShell = basename(shellPath);
    return `${Deno.env.get('HOME')}/.${defaultShell}rc`;
  }
  throw DenodarseLogger.getError('SHELL_CONFIG_NOT_FOUND');
}
