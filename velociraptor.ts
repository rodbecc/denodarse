import { ScriptsConfiguration } from "./dev_deps.ts";

export default <ScriptsConfiguration> {
  scripts: {
    install_docker_aliases: {
      cmd: "deno run scripts/install_aliases.ts docker",
      desc: "Adds to your shell config file Docker and Docker Compose aliases",
      allow: ["env", "read", "write"],
      unstable: true,
      watch: false,
    },
    install_self_update: {
      cmd: "deno run scripts/self_update.ts install",
      desc: "Adds to your shell config file the self update script",
      allow: ["env", "read", "write"],
      unstable: true,
      watch: false,
    },
    self_update: {
      cmd: "deno run scripts/self_update.ts",
      desc: "Self update your deno-scripts local repository",
      allow: ["env", "read", "write"],
      unstable: true,
      watch: false,
    },
  },
};
