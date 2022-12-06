import { createRequire } from "node:module";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream } from "node:fs";
import getDirname from "../utils/getDirname.js";
import { join } from "node:path";

const requireCJS = createRequire(import.meta.url);
const { createGzip } = requireCJS("node:zlib");

const compress = async () => {
  const currentDirname = getDirname(import.meta.url);
  const sourceFilePath = join(currentDirname, "./files/fileToCompress.txt");
  const destinationFilePath = join(currentDirname, "./files/archive.gz");
  const gzip = createGzip();
  const source = createReadStream(sourceFilePath);
  const destination = createWriteStream(destinationFilePath);

  try {
    await pipeline(source, gzip, destination);
  } catch (err) {
    console.error("An error occurred:", err);
    process.exitCode = 1;
  }
};

await compress();

// compress.js - implement function that compresses file fileToCompress.txt to archive.gz using zlib and Streams API
