const fs = require("fs");

function loadConfig() {
  const configPath = "./config.json";

  return new Promise((resolve, reject) => {
    fs.readFile(configPath, "utf8", (err, data) => {
      if (err) {
        reject("Error reading the configuration file: " + err);
        return;
      }
      try {
        const config = JSON.parse(data);
        resolve(config);
      } catch (parseError) {
        reject("Error parsing the JSON file: " + parseError);
      }
    });
  });
}

module.exports = loadConfig;
