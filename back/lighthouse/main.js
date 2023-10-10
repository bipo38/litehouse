import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";
import configs from "./configs.js";

const args = process.argv
const url = args[2]
const config = args[3]


const startChrome = async (callback) => {
  const flags = {
    chromeFlags: ["--quiet", "--headless"],
  };
  const chrome = await chromeLauncher.launch(flags);

  const result = await callback(chrome.port);

  await chrome.kill();

  return result;
};


const startLighthouse = async () => {

  const result = await startChrome(async (port) => {
    return await lighthouse(url, { port }, configs[config]);
  })

  return result
}




process.stdout.write(JSON.stringify(await startLighthouse()))







