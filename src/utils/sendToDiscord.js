const { URL } = require("url");

async function sendToDiscord(message, webhookUrl) {
  const data = {
    content: message,
  };

  const url = new URL(webhookUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status !== 204) {
      console.log(`Failed to send message. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error sending message to Discord:", error.message);
  }
}

module.exports = sendToDiscord;
