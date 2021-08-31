import { Ask } from "/deps.ts";
import { iro, iroColors } from "/deps.ts";
import { dirname, fromFileUrl } from "/deps.ts";

const cwd = dirname(fromFileUrl(import.meta.url));

checkNewVersion();

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
