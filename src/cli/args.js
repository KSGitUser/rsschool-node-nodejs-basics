import { argv } from "node:process";

const parseArgs = () => {
  const [, , ...argvs] = argv;
  const resultArgvs = [];
  let i = 0;
  while (i < argvs.length) {
    if (argvs[i].startsWith("--")) {
      resultArgvs.push(`${argvs[i].substring(2)} is ${argvs?.[i + 1]}`);
      i += 2;
    } else {
      i += 1;
    }
  }
  console.log(resultArgvs.join(", "));
};

parseArgs();
