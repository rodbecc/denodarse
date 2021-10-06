import { basename } from 'std/path';

import { DenodarseErrors } from '/utils/denodarse_errors.ts';

export function getShellConfigFullPath(): string {
  const shellPath = Deno.env.get('SHELL');

  if (shellPath) {
    const defaultShell = basename(shellPath);
    return `${Deno.env.get('HOME')}/.${defaultShell}rc`;
  }
  throw DenodarseErrors.get('SHELL_CONFIG_NOT_FOUND');
}
