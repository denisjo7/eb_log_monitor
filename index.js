const fs = require("fs");
const askQuestion = require("./src/utils/askQuestion");
const monitorFile = require("./src/utils/monitorFile");

const logFilePaths = [];
const logIdentifiers = [];
let webhookUrl = "";
let fileSizes = logFilePaths.map(() => 0);
let lastCoord = "";

async function main() {
  let finishedFilePaths = false;

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
        lastCoord,
        logIdentifiers,
        webhookUrl
      );
    });
  }

  console.log("Starting data monitoring");
}

main().catch(console.error);
