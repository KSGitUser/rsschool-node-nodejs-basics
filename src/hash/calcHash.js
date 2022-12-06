import getDirname from "../utils/getDirname.js";
import { join } from "node:path";
import { createReadStream } from "node:fs";

const calculateHash = async () => {
  const pathToFile = "./files/fileToCalculateHashFor.txt";
  const fullPathToFile = join(getDirname(import.meta.url), pathToFile);
  const rs = createReadStream(fullPathToFile);
  const fileData = [];

  try {
    const { createHash } = await import("node:crypto");
    const hash = createHash("sha256");
    rs.on("data", (data) => {
      fileData.push(data.toString());
    });
    rs.on("end", () => {
      hash.update(fileData.join(""));
      console.log(hash.digest("hex"));
    });
  } catch (err) {
    throw err;
  }
};

await calculateHash();
