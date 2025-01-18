const extractCoordinates = require("./extractCoordinates");
const sendToDiscord = require("./sendToDiscord");

async function processLine(
  line,
  fileIndex,
  logIdentifiers,
  coords,
  webhookUrl
) {
  const filterPhrase = "pickitem timeout";
  const additionalKeywords = [
    "divine",
    "mirror",
    "kalandra",
    "perfect",
    "exalted",
  ];

  const lowerLine = line.toLowerCase();
  let selectedKeyword = "";
  if (lowerLine.includes(filterPhrase)) {
    const matchesKeyword = additionalKeywords.some((keyword) => {
      const checkKeyword = lowerLine.includes(keyword);

      if (checkKeyword) {
        selectedKeyword = keyword;
        return true;
      }
    });

    if (matchesKeyword) {
      const vmIdentifier = logIdentifiers[fileIndex];
      const currCoord = extractCoordinates(line);

      if (currCoord === coords.lastCoord) {
        return;
      } else {
        coords.lastCoord = currCoord;
        console.log(`[${vmIdentifier}] ${line}\n`);

        await sendToDiscord(
          `[${vmIdentifier}] ${selectedKeyword} ignored`,
          webhookUrl
        );
      }
    }
  }
}

module.exports = processLine;
