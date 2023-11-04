const fs = require("fs");
const process = require("process");
const mkdirp = require("mkdirp");
const execSync = require("child_process").execSync;

const args = process.argv.slice(2);
const name = args[0];

module.exports = function () {
  if (!name) {
    throw new Error("Name is required");
  }
  // check folder with name exists
  mkdirp.sync(name);

  // console.log("create-unicorn :: ", __dirname, process.cwd());
  const templateDir = `${__dirname}/template/`;
  const projectDir = `${process.cwd()}/${name}/`;

  mkdirp.sync(projectDir + "/.vscode");

  fs.copyFile(
    templateDir + "/.vscode/settings.json",
    projectDir + "/.vscode/settings.json",
    (err) => {
      if (err) throw err;
      // console.log("/.vscode/settings.json  was copied");
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
    destFileName = altNames[fileName] || fileName;

    fs.copyFile(templateDir + fileName, projectDir + destFileName, (err) => {
      if (err) throw err;
      // console.log(fileName + " was copied");
    });
  });
  process.chdir(projectDir);
  execSync("npm init -y");
  execSync("git init");
  console.log(`${name} project created`);
};
