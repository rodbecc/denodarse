import Ask from "ask";
import iro, { bold, yellow } from "iro";
import { dirname, fromFileUrl } from "std/path";

import { textDecoder } from "/dev_deps.ts";
import { printLogo } from "/logo/print_logo.ts";

const cwd = dirname(fromFileUrl(import.meta.url));

checkNewVersion();

async function checkNewVersion() {
  const _fetch = await Deno.run({
    cmd: "git fetch -q origin main".split(" "),
    cwd,
  }).status();

  const gitLogOriginCmd = "git log origin/main -1 --format=%H".split(" ");
  const gitLogLocalCmd = "git log main -1 --format=%H".split(" ");

  const localHash = textDecoder(
    await Deno.run({
      cmd: gitLogOriginCmd,
      stdout: "piped",
      cwd,
    }).output(),
  );
  const originHash = textDecoder(
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

  const { shouldUpdate } = await ask.confirm({
    name: "shouldUpdate",
    prefix: ">",
    message: iro(
      "There is a new version of Denodarse. Do you want to update?",
      bold,
      yellow,
    ),
    type: "confirm",
  });

  shouldUpdate && update();
}

async function update() {
  const checkoutToMainCmd = Deno.run({
    cmd: "git checkout -q main".split(" "),
    stderr: "piped",
    cwd,
  });

  const [changedToMain, error] = await Promise.all([
    checkoutToMainCmd.status().then((status) => status.success),
    checkoutToMainCmd.stderrOutput(),
  ]);

  checkoutToMainCmd.close();

  const runPullOriginMainCmd = Deno.run({
    cmd: "git pull origin main --ff-only".split(" "),
    cwd,
  });

  await (changedToMain
    ? runPullOriginMainCmd.status().then(() => printLogo())
    : Promise.reject(textDecoder(error)));
}
