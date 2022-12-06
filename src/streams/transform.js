import { Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { stdin, stdout } from "node:process";

const transform = async () => {
  const reverseData = new Transform({
    transform(chunk, encoding, callback) {
      const reversedText = chunk.toString().split("").reverse().join("");
      callback(null, reversedText);
    },
  });

  try {
    await pipeline(stdin, reverseData, stdout);
  } catch (err) {
    console.error("Pipeline failed: ", err);
    throw err;
  }
};

await transform();
