import { createRequire } from "node:module";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import getDirname from "../utils/getDirname.js";
import { join } from "node:path";

const requireCJS = createRequire(import.meta.url);
const { createUnzip } = requireCJS("node:zlib");

const decompress = async () => {
  const currentDirname = getDirname(import.meta.url);
  const sourceFilePath = join(currentDirname, "./files/archive.gz");
  const destinationFilePath = join(
    currentDirname,
    "./files/fileToCompress.txt"
  );
  const unzip = createUnzip();
  const source = createReadStream(sourceFilePath);
  const destination = createWriteStream(destinationFilePath);

  try {
    await pipeline(source, unzip, destination);
  } catch (err) {
    console.error("An error occurred:", err);
    process.exitCode = 1;
  }
};

await decompress();
