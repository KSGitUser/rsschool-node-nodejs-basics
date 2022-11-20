import getDirname from "../utils/getDirname.js";
import { join } from "node:path";
import { stdin } from "node:process";
import { createWriteStream } from "node:fs";

const write = async () => {
  const pathToFile = "./files/fileToWrite.txt";
  const fullPathToFile = join(getDirname(import.meta.url), pathToFile);
  const ws = createWriteStream(fullPathToFile, { encoding: "utf8" });

  stdin.pipe(ws);
};

await write();
