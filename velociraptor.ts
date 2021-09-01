import { ScriptDefinition, ScriptsConfiguration } from "./dev_deps.ts";

const common: Partial<ScriptDefinition> = {
  allow: ["env", "read", "write"],
  unstable: true,
  watch: false,
  imap: "./import_map.json",
};

export default <ScriptsConfiguration> {
  scripts: {
    test: {
      cmd: "deno test",
      desc: "Run tests",
      ...common,
      allow: ["all"],
    },
    install_docker_aliases: {
      cmd: "scripts/install_aliases.ts docker",
      desc: "Adds to your shell config file Docker and Docker Compose aliases",
      ...common,
    },
    install_self_update: {
      cmd: [
        "vr create_self_update_bin",
        "scripts/install_self_update_bin.ts",
      ],
      desc:
        "Creates self update script bin and adds it to your shell config file",
      ...common,
    },
    self_update: {
      cmd: "scripts/self_update.ts",
      desc:
        "[INTERNAL] Self update your deno-scripts local repository with deno, instead of the bin",
      ...common,
      allow: ["env", "read", "write", "run"],
    },
    create_self_update_bin: {
      cmd:
        "deno install --force --allow-run --name deno_scripts_self_update scripts/self_update.ts",
      desc: "[INTERNAL] Creates self update script bin",
      ...common,
      allow: ["env", "read", "write", "run"],
    },
  },
};
