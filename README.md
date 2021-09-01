# DENO SCRIPTS

[![Deno](https://github.com/rodbecc/deno-scripts/actions/workflows/deno.yml/badge.svg?event=pull_request)](https://github.com/rodbecc/deno-scripts/actions)

</p><img align="center" src="./assets/denon_output.png" style="{ padding: 20px 20px } " alt="the deno mascot dinosaur standing in the rain"></p>

## Install

Install **Deno** using Homebrew (Mac) or see
[deno install](https://github.com/denoland/deno_install/blob/master/README.md)
for more options:

```sh
brew install deno
```

Add the **Deno** binary to the PATH variable in your shell configuration file.
For ZSH shell, for instance:

```sh
echo 'export DENO_INSTALL="/Users/$USER/.deno"' >> ~/.zshrc
echo 'export PATH="$DENO_INSTALL/bin:$PATH"' >> ~/.zshrc
```

Install **Velociraptor** to watch files, list available scripts, and run
predefined scripts:

```sh
deno install -qA -n vr https://deno.land/x/velociraptor@1.1.0/cli.ts
```

To list all available scripts, run **Velociraptor** with no args:

```sh
vr
```
