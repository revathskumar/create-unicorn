import fs from "node:fs";
import process from "node:process";
import mkdirp from "mkdirp";
import { execSync } from "node:child_process";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const args = process.argv.slice(2);
const name = args[0];

export default function () {
  if (!name) {
    throw new Error("Name is required");
  }
  // check folder with name exists
  mkdirp.sync(name);

  const templateDir = `${__dirname}/template/`;
  const projectDir = `${process.cwd()}/${name}/`;

  mkdirp.sync(projectDir + "/.vscode");

  fs.copyFile(
    templateDir + "/.vscode/settings.json",
    projectDir + "/.vscode/settings.json",
    (err) => {
      if (err) throw err;
    }
  );

  const altNames = {
    gitignore: ".gitignore",
  };
  [
    "README.md",
    "LICENSE",
    "index.js",
    ".editorconfig",
    "gitignore",
    ".npmrc",
    ".nvmrc",
    ".env.example",
  ].forEach((fileName) => {
    const destFileName = altNames[fileName] || fileName;

    fs.copyFile(templateDir + fileName, projectDir + destFileName, (err) => {
      if (err) throw err;
    });
  });
  process.chdir(projectDir);
  execSync("npm init -y");
  execSync("git init");
  console.log(`${name} project created`);
}
