import { rm } from "node:fs/promises";
import { join } from "node:path";
import getDirname from "../utils/getDirname.js";

const remove = async () => {
  const fileName = "fileToRemove.txt";
  const pathToFile = "/files";
  const currentDirectory = getDirname(import.meta.url);

  try {
    await rm(join(currentDirectory, pathToFile, fileName));
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error("FS operation failed");
    }
    throw err;
  }
};

await remove();
