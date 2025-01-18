process.removeAllListeners("warning");

const fs = require("fs");
const askQuestion = require("./src/utils/askQuestion");
const monitorFile = require("./src/utils/monitorFile");
const loadConfig = require("./src/utils/loadConfig");

const logFilePaths = [];
const logIdentifiers = [];
let webhookUrl = "";
let fileSizes = logFilePaths.map(() => 0);
const coords = {
  lastCoord: "",
};

async function main() {
  let autoOrManual = "";
  let finishedFilePaths = false;

  do {
    autoOrManual = await askQuestion(
      `1- Use config file
2- Configure manually
Auto or manual? `
    );
    autoOrManual = autoOrManual.trim();
  } while (autoOrManual !== "1" && autoOrManual !== "2");

  if (autoOrManual === "1") {
    let configFilePath = "";

    do {
      configFilePath = await askQuestion("Config file path: ");
      configFilePath = configFilePath.trim();
    } while (configFilePath === "");

    let config = {};

    try {
      config = await loadConfig(configFilePath);
    } catch (error) {
      console.error(error);
      return;
    }

    webhookUrl = config.webhookUrl;
    config.paths.forEach((path) => logFilePaths.push(path));
    config.names.forEach((name) => logIdentifiers.push(name));
  } else {
    do {
      webhookUrl = await askQuestion("Discord Webhook Url: ");
      webhookUrl = webhookUrl.trim();
    } while (webhookUrl === "");

    while (!finishedFilePaths) {
      let filePath = "";
      let fileName = "";
      let addMore = "";

      do {
        filePath = await askQuestion("Log file path: ");
        filePath = filePath.trim();
        logFilePaths.push(filePath);
      } while (filePath === "");

      do {
        fileName = await askQuestion("Log file name: ");
        fileName = fileName.trim();
        logIdentifiers.push(fileName);
      } while (fileName === "");

      do {
        addMore = await askQuestion("Add more logs? (y/n): ");
        finishedFilePaths = addMore === "n";
        console.log();
      } while (addMore !== "y" && addMore !== "n");
    }
  }

  for (let index = 0; index < logFilePaths.length; index++) {
    const logFilePath = logFilePaths[index];

    fs.stat(logFilePath, (err, stats) => {
      if (err) {
        console.error("Error retrieving file data:", err);
        return;
      }
      fileSizes[index] = stats.size;

      monitorFile(
        logFilePath,
        index,
        fileSizes,
        coords,
        logIdentifiers,
        webhookUrl
      );
    });
  }

  console.log("\nStarting data monitoring\n");
}

main().catch(console.error);
