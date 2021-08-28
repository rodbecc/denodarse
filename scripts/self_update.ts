import { Ask } from "../deps.ts";
import { iro, iroColors } from "../deps.ts";
import { fromFileUrl, dirname } from "../deps.ts";
import { appendToFile } from "../utils/file_handler.ts";
import { getShellConfigFullPath } from "../utils/shell_handler.ts";

const thisScript = fromFileUrl(import.meta.url);
const cwd = dirname(thisScript);

function installSelfUpdateOnShellStart() {
  const command = `deno run --unstable --allow-all ${thisScript}`;
  const configFile = getShellConfigFullPath();
  if (configFile) {
    appendToFile(configFile, [command]);
  }
}

async function checkNewVersion() {
  const gitLogOriginCmd = "git log origin/master -1 --format=%H".split(" ");
  const gitLogLocalCmd = "git log master -1 --format=%H".split(" ");
  const decoder = new TextDecoder();

  const localHash = decoder.decode(
    await Deno.run({
      cmd: gitLogOriginCmd,
      stdout: "piped",
      cwd,
    }).output()
  );
  const originHash = decoder.decode(
    await Deno.run({
      cmd: gitLogLocalCmd,
      stdout: "piped",
      cwd,
    }).output()
  );

  if (localHash === originHash) {
    promptUpdate();
  }
}

async function promptUpdate() {
  const ask = new Ask();

  const { bold, yellow } = iroColors;
  const { shouldUpdate } = await ask.confirm({
    name: "shouldUpdate",
    prefix: ">",
    message: iro(
      "O Projeto DevOps possui novas atualizações. Deseja atualizar?",
      bold,
      yellow
    ),
    type: "confirm",
  });

  shouldUpdate && update();
}

async function update() {
  const cmd = "git pull origin master".split(" ");
  await Deno.run({
    cmd,
    cwd,
  }).status();
}

Deno.args.includes("install")
  ? installSelfUpdateOnShellStart()
  : checkNewVersion();
