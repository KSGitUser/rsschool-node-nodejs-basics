import getDirname from "../utils/getDirname.js";
import { join } from "node:path";
import { createReadStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { stdout } from "node:process";

const read = async () => {
  const pathToFile = "./files/fileToRead.txt";
  const fullPathToFile = join(getDirname(import.meta.url), pathToFile);
  const fileReadableStream = createReadStream(fullPathToFile);

  try {
    await pipeline(fileReadableStream, stdout);
  } catch (err) {
    console.error("Pipeline failed:", err);
  }
};

await read();
