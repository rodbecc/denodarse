import _Ask from "https://deno.land/x/ask@1.0.6/mod.ts";
import _iro, { bold, yellow } from "https://deno.land/x/iro@1.0.3/mod.ts";
export { existsSync } from "https://deno.land/std@0.106.0/fs/mod.ts";
export {
  basename,
  dirname,
  fromFileUrl,
  normalize,
} from "https://deno.land/std@0.106.0/path/mod.ts";

export const Ask = _Ask;
export const iro = _iro;
export const iroColors = { bold, yellow };
