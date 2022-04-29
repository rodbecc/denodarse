import { spy } from 'mock';

import { assertEquals } from '../dev_deps.ts';
import { shouldCheckForUpdates } from '../scripts/self_update.ts';

// import { mock, assertEquals } from '/dev_deps.ts';

/**
 * should check for updates each x days
 * mocks: checkUpdateIntervalEnv, lastCheckUpdateDate
 */
Deno.test('should check for updates each x days', () => {
});

/**
 * if the varible is not defined, should check every time
 */
