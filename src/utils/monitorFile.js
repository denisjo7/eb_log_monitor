const fs = require("fs");
const { createInterface } = require("readline");
const processLine = require("./processLine");

function monitorFile(
  logFilePath,
  fileIndex,
  fileSizes,
  lastCoord,
  logIdentifiers,
  webhookUrl
) {
  fs.watchFile(logFilePath, { interval: 1000 }, (curr, prev) => {
    if (curr.size > prev.size) {
      const readStream = fs.createReadStream(logFilePath, {
        encoding: "utf8",
        start: fileSizes[fileIndex],
      });

      const rl = createInterface({
        input: readStream,
        crlfDelay: Infinity,
      });

      rl.on("line", (line) => {
        processLine(line, fileIndex, logIdentifiers, lastCoord, webhookUrl);
      });

      rl.on("close", () => {
        fileSizes[fileIndex] = curr.size;
      });
    }
  });
}

module.exports = monitorFile;
