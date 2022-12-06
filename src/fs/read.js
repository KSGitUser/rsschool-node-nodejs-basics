import { readFile } from "node:fs/promises";
import getDirname from "../utils/getDirname.js";
import { join } from "node:path";

const read = async () => {
  const pathToFile = "./files/fileToRead.txt";
  const fullPathToFile = join(getDirname(import.meta.url), pathToFile);

  try {
    const fileContent = await readFile(fullPathToFile, { encoding: "utf8" });
    console.log(fileContent);
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw err;
  }
};

await read();
