import { existsSync } from "https://deno.land/std@0.106.0/fs/mod.ts";
import {
  normalize,
  fromFileUrl,
} from "https://deno.land/std@0.106.0/path/mod.ts";
import { appendToFile } from "./utils/file_handler.ts";
import { getShellConfigFullPath } from "./utils/shell_handler.ts";

function installAliases() {
  const shellConfigFilePath = getShellConfigFullPath();

  if (shellConfigFilePath) {
    const paths = Deno.args.map((arg) =>
      fromFileUrl(normalize(`${import.meta.url}/../aliases/${arg}`))
    );

    const validPaths = paths.filter((path) => existsSync(path));
    const commands = validPaths.map((scriptPath) => `source ${scriptPath}`);
    appendToFile(shellConfigFilePath, commands);
  }
}

installAliases();
