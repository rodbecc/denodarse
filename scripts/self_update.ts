import { Ask } from "/deps.ts";
import { iro, iroColors } from "/deps.ts";
import { dirname, fromFileUrl, normalize } from "/deps.ts";
import { appendToFile } from "/utils/file_handler.ts";
import { getShellConfigFullPath } from "/utils/shell_handler.ts";

const thisScript = fromFileUrl(import.meta.url);
const cwd = dirname(thisScript);

Deno.args.includes("install")
  ? installSelfUpdateOnShellStart()
  : checkNewVersion();

// TODO: When installing the self_update script, transforms it in a binary,
// so we don't need to worry with paths
function installSelfUpdateOnShellStart() {
  const importMap = normalize(`${cwd}/../import_map.json`);
  const commentLine = "# Deno Scripts - Self update script:";
  const command =
    `deno run --unstable --import-map=${importMap} --allow-all ${thisScript}`;
  const configFile = getShellConfigFullPath();
  if (configFile) {
    appendToFile(configFile, [commentLine, command]);
  }
}

async function checkNewVersion() {
  const _fetch = await Deno.run({
    cmd: "git fetch -q origin main".split(" "),
    cwd,
  }).status();

  const gitLogOriginCmd = "git log origin/main -1 --format=%H".split(" ");
  const gitLogLocalCmd = "git log main -1 --format=%H".split(" ");

  const decoder = new TextDecoder();

  const localHash = decoder.decode(
    await Deno.run({
      cmd: gitLogOriginCmd,
      stdout: "piped",
      cwd,
    }).output(),
  );
  const originHash = decoder.decode(
    await Deno.run({
      cmd: gitLogLocalCmd,
      stdout: "piped",
      cwd,
    }).output(),
  );

  if (localHash !== originHash) {
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
      "There is a new version of Deno Scripts. Do you want to update?",
      bold,
      yellow,
    ),
    type: "confirm",
  });

  shouldUpdate && update();
}

async function update() {
  await Deno.run({
    cmd: "git checkout -q main".split(" "),
    cwd,
  }).status();

  await Deno.run({
    cmd: "git pull origin main --ff-only".split(" "),
    cwd,
  }).status();
}
