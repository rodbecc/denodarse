import { assertEquals, mock, stub } from "/dev_deps.ts";
import { getShellConfigFullPath } from "/utils/shell_handler.ts";

Deno.test("should return shell config full path if SHELL env is defined", () => {
  const get = stub(
    Deno.env,
    "get",
    mock({ SHELL: "/bin/bash", HOME: "/Users/randomUser" }),
  );

  assertEquals(
    getShellConfigFullPath(),
    "/Users/randomUser/.bashrc",
  );

  assertEquals(get.calls, [
    {
      args: ["SHELL"],
      self: Deno.env,
      returned: "/bin/bash",
    },
    {
      args: ["HOME"],
      self: Deno.env,
      returned: "/Users/randomUser",
    },
  ]);

  get.restore();
});

Deno.test("should return undefined if SHELL env is undefined", () => {
  const get = stub(Deno.env, "get", mock({ SHELL: undefined }));

  assertEquals(
    getShellConfigFullPath(),
    undefined,
  );

  assertEquals(get.calls, [
    {
      args: ["SHELL"],
      self: Deno.env,
      returned: undefined,
    },
  ]);

  get.restore();
});
