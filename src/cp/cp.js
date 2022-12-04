import { spawn, fork } from "node:child_process";
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

  // или моно только этой строчкой вместо spawn
  // const childProcess = fork(fullPathToChildProcess, [...args]);
};

spawnChildProcess('arg1', 'arg2', 'arg3');
