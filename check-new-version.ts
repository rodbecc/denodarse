import Ask from "https://deno.land/x/ask@1.0.6/mod.ts";
import iro, { bold, yellow } from "https://deno.land/x/iro@1.0.3/mod.ts";
import { selfUpdate } from "./self-update.ts";

async function checkNewVersion(): Promise<void> {
  const gitLogOriginCmd = "git log origin/master -1 --format=%H".split(" ");
  const gitLogLocalCmd = "git log master -1 --format=%H".split(" ");
  const decoder = new TextDecoder();

  const localHash = decoder.decode(
    await Deno.run({
      cmd: gitLogOriginCmd,
      stdout: "piped",
    }).output()
  );
  const originHash = decoder.decode(
    await Deno.run({
      cmd: gitLogLocalCmd,
      stdout: "piped",
    }).output()
  );

  if (localHash === originHash) {
    promptUpdate();
  }
}

async function promptUpdate(): Promise<void> {
  const ask = new Ask();

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

  shouldUpdate && selfUpdate();
}

checkNewVersion();
