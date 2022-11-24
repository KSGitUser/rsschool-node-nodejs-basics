import { spawn } from "node:child_process";
import getDirname from "../utils/getDirname.js";
import { join } from "node:path";

const spawnChildProcess = async (...args) => {
  const pathToChildProcess = "./files/script.js";
  const currentDirname = getDirname(import.meta.url);
  const fullPathToChildProcess = join(currentDirname, pathToChildProcess);
  const childProcess = spawn(process.execPath, [
    fullPathToChildProcess,
    ...args,
  ]);

  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
};

spawnChildProcess();
