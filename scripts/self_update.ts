import Ask from 'ask';
import iro, { bold, yellow } from 'iro';
import { difference, format } from 'std/datetime';
import { dirname, fromFileUrl } from 'std/path';

import { textDecoder } from '/dev_deps.ts';
import { printLogo } from '/logo/print_logo.ts';

const cwd = dirname(fromFileUrl(import.meta.url));
const today = format(new Date(), 'yyyy-MM-dd');
const lastCheckUpdateFileName = 'last_check_update.txt';

shouldCheckForUpdates();

async function shouldCheckForUpdates() {
  const checkUpdateIntervalEnv = Deno.env.get('CHECK_UPDATE_INTERVAL');

  if (!checkUpdateIntervalEnv) {
    return checkNewVersion();
  }

  try {
    const lastCheckUpdateDate = new Date(
      await Deno.readTextFile(
        lastCheckUpdateFileName,
      ),
    );

    const daysSinceLastCheckUpdate = difference(lastCheckUpdateDate, new Date(today), {
      units: ['days'],
    }).days;

    daysSinceLastCheckUpdate &&
      daysSinceLastCheckUpdate >= +checkUpdateIntervalEnv && checkNewVersion();
  } catch {
    checkNewVersion();
  }
}

async function checkNewVersion() {
  storeLastCheckUpdateDate();
  const _fetch = await Deno.run({ cmd: 'git fetch -q origin main'.split(' '), cwd }).status();

  const gitLogOriginCmd = 'git log origin/main -1 --format=%H'.split(' ');
  const gitLogLocalCmd = 'git log main -1 --format=%H'.split(' ');

  const localHash = textDecoder(
    await Deno.run({ cmd: gitLogOriginCmd, stdout: 'piped', cwd }).output(),
  );
  const originHash = textDecoder(
    await Deno.run({ cmd: gitLogLocalCmd, stdout: 'piped', cwd }).output(),
  );

  if (localHash !== originHash) {
    promptUpdate();
  }
}

async function promptUpdate() {
  const ask = new Ask();

  const { shouldUpdate } = await ask.confirm({
    name: 'shouldUpdate',
    prefix: '>',
    message: iro('There is a new version of Denodarse. Do you want to update?', bold, yellow),
    type: 'confirm',
  });

  shouldUpdate && update();
}

async function update() {
  const checkoutToMainCmd = Deno.run({ cmd: 'git checkout -q main'.split(' '), stderr: 'piped', cwd });

  const [changedToMain, error] = await Promise.all([
    checkoutToMainCmd.status().then((status) => status.success),
    checkoutToMainCmd.stderrOutput(),
  ]);

  checkoutToMainCmd.close();

  const runPullOriginMainCmd = Deno.run({ cmd: 'git pull origin main --ff-only'.split(' '), cwd });

  await (changedToMain ? runPullOriginMainCmd.status().then(() => printLogo()) : Promise.reject(textDecoder(error)));
}

async function storeLastCheckUpdateDate() {
  try {
    await Deno.writeTextFile(lastCheckUpdateFileName, today);
  } catch {
    console.error(
      `An error ocurred while creating ${lastCheckUpdateFileName}!`,
    );
  }
}
