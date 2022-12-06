import { Worker } from "node:worker_threads";
import getDirname from "../utils/getDirname.js";
import { join } from "node:path";
import os from "os";

const createWorkerPromise = (workerData, pathToFile) => {
  const RESULT_STATUSES = {
    RESOLVED: "resolved",
    ERROR: "error",
  };

  const createResult = (status, data) => ({ status, data });

  return new Promise((resolve, reject) => {
    const worker = new Worker(pathToFile, { workerData });

    worker.on("message", (messageData) => {
      resolve(createResult(RESULT_STATUSES.RESOLVED, messageData));
    });
    worker.on("error", () => {
      reject(createResult(RESULT_STATUSES.ERROR, null));
    });
  });
};

const performCalculations = async () => {
  const numberOfCpus = os.cpus().length;
  if (!numberOfCpus) {
    return;
  }

  const currentDirectory = getDirname(import.meta.url);
  const workerFullPath = join(currentDirectory, "worker.js");
  let initialWorkerData = 10;

  const workerPromises = Array.from(Array(numberOfCpus)).map(() =>
    createWorkerPromise(initialWorkerData++, workerFullPath)
  );

  return await Promise.allSettled(workerPromises).then((results) =>
    results.map((workerResult) => {
      return workerResult.reason || workerResult.value;
    })
  );
};

const calculationsResults = await performCalculations();

console.log(calculationsResults);
