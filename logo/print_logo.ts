import { dirname, fromFileUrl } from "std/path";

export async function printLogo(): Promise<void> {
  await Deno.run({
    cmd: ["./logo.sh"],
    cwd: dirname(fromFileUrl(import.meta.url)),
  }).status();
}
