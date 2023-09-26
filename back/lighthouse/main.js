import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";


const args = process.argv
const url = args[0]
const config = [0]


const startChrome = async (callback) => {
    const flags = {
      chromeFlags: ["--quiet", "--headless"],
    };
    const chrome = await chromeLauncher.launch(flags);
  
    const result = await callback(chrome.port);
  
    await chrome.kill();
  
    return result;
  };


  const startLighthouse = async () =>  {

    await startChrome(async(port) => {
    return  await lighthouse(url, { port }, config );
    })
    
  }


await process.stdout.write(startLighthouse)
