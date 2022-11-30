import { join, parse } from "node:path";
import { rename as renameFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import getDirname from "../utils/getDirname.js";

const rename = async () => {
  const currentDirname = getDirname(import.meta.url);
  const fileNameToRename = "wrongFilename.txt";
  const directoryPath = "/files";
  const pathToOriginalFile = join(
    currentDirname,
    directoryPath,
    fileNameToRename
  );
  const fileName = parse(fileNameToRename)?.name;
  const fileExtension = ".md";
  const pathToRenamedFile = join(
    currentDirname,
    directoryPath,
    fileName + fileExtension
  );

  const existsAsync = (pathToRenamedFile) => new Promise((resolve, reject) => {
    if (existsSync(pathToRenamedFile)) {
      const errorExist = { ...new Error("FS operation failed - exist"),
        code: 'EEXIST'
      }
      reject(errorExist);
    }
    resolve(false);
  })



  try {
    await existsAsync(pathToRenamedFile);
    await renameFile(pathToOriginalFile, pathToRenamedFile);
  } catch (err) {
    if ((err.code === "ENOENT") || err.code === "EEXIST") {
      throw new Error("FS operation failed");
    }
    throw err;
  }
};

await rename();
