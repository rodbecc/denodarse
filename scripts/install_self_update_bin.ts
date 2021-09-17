import { appendToFile } from "/utils/file_handler.ts";
import { getShellConfigFullPath } from "/utils/shell_handler.ts";

function installSelfUpdateBin() {
  const commentLine = "# Conflict here";
  const command = "deno_scripts_self_update";
  const configFile = getShellConfigFullPath();
  if (configFile) {
    appendToFile(configFile, [commentLine, command]);
  }
}

installSelfUpdateBin();
