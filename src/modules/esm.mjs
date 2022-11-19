import path from "node:path";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import "./files/c.js";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const requireCJS = createRequire(import.meta.url);
const random = Math.random();

let unknownObject;

if (random > 0.5) {
  // можно использовать закомментированную сточку ниже, но она experimental по этому лучше указанное решение
  // unknownObject = await import('./files/a.json', {assert: { type: 'json' }});
  unknownObject = requireCJS("./files/a.json");
} else {
  unknownObject = requireCJS("./files/b.json");
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${fileURLToPath(import.meta.url)}`);
console.log(
  `Path to current directory is ${path.dirname(fileURLToPath(import.meta.url))}`
);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
