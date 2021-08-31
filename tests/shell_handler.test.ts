import { assertEquals, Stub, stub } from "../dev_deps.ts";
import { getShellConfigFullPath } from "../utils/shell_handler.ts";

const mockDenoEnv = (denoEnvMock: string[] | null[]): Stub<
  {
    get(key: string): string | undefined;
    set(key: string, value: string): void;
    delete(key: string): void;
    toObject(): { [index: string]: string };
  }
> =>
  stub(Deno.env, "get", [
    ...denoEnvMock,
  ]);

Deno.test("should return shell config full path", () => {
  const denoEnvMock = ["zsh", "/Users/$USER"];
  mockDenoEnv(denoEnvMock);
  assertEquals(
    getShellConfigFullPath(),
    `${denoEnvMock[1]}/.${denoEnvMock[0]}rc`,
  );
});
