import process from "node:process";

const parseEnv = () => {
  const envs = process.env; // Write your code here
  const foundEnvs = [];
  Reflect.ownKeys(envs)
    .filter((key) => key.startsWith("RSS_"))
    .forEach((key) => {
      foundEnvs.push(`${key}=${envs[key]}`);
    });
  console.log(foundEnvs.join("; "));
};

parseEnv();
