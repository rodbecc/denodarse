import { existsSync } from "../deps.ts";
import { normalize, fromFileUrl } from "../deps.ts";
import { appendToFile } from "../utils/file_handler.ts";
import { getShellConfigFullPath } from "../utils/shell_handler.ts";

function installAliases() {
  const shellConfigFilePath = getShellConfigFullPath();

  if (shellConfigFilePath) {
    const paths = Deno.args.map((arg) =>
      fromFileUrl(normalize(`${import.meta.url}/../../aliases/${arg}`))
    );

    const validPaths = paths.filter((path) => existsSync(path));
    const commands = validPaths.map((scriptPath) => `source ${scriptPath}`);
    appendToFile(shellConfigFilePath, commands);
  }
}

installAliases();
