require("dotenv").config();
const venom = require("venom-bot");
const axios = require("axios");
const wifi = require("node-wifi");

wifi.init({ iface: null });

// Connect to network using .env variables
wifi.connect(
  { ssid: process.env.WIFI_SSID, password: process.env.WIFI_PASSWORD },
  (error) => {
    if (error) console.error(error);
    else console.log("Connected to WiFi");
  }
);

venom
  .create({ session: "session-name" })
  .then((client) => start(client))
  .catch((error) => console.error(error));

async function start(client) {
  client.onMessage(async (message) => {
    if (typeof message.body === "string") {
      const formattedMessage = message.body.toLowerCase().trim();

      try {
        if (formattedMessage === "open gate") {
          await sendRawSignal(message.from, client);
        } else if (formattedMessage === "open file") {
          await sendFileSignal(message.from, client);
        } else if (formattedMessage.startsWith("jammer")) {
          await toggleJammer(formattedMessage, message.from, client);
        }
      } catch (error) {
        console.error("Error: ", error);
        await client.sendText(
          message.from,
          "An error occurred, please try again."
        );
      }
    }
  });
}

async function sendRawSignal(to, client) {
  const rawResponse = await axios.get(
    `${process.env.DEVICE_URL}/SENDRAW?P1=${process.env.RAW_SIGNAL}`
  );
  await client.sendText(to, "(SEND RAW SIGNAL) Opening gate, please wait...");
  console.log("Response RAW:", rawResponse.data);
}

async function sendFileSignal(to, client) {
  await axios.get(`${process.env.DEVICE_URL}/TXSD`);
  const fileResponse = await axios.get(
    `${process.env.DEVICE_URL}/APPLY?P1=CURRENT&P2=vale_do_cedro-gate.sub`
  );
  await client.sendText(to, "(SEND FILE SIGNAL) Opening gate, please wait...");
  console.log("Response File:", fileResponse.data);
}

async function toggleJammer(command, to, client) {
  const mode = command.split(" ")[1];
  if (mode === "true") {
    await setupJammer(true, client, to);
  } else if (mode === "false") {
    await axios.get(`${process.env.DEVICE_URL}/APPLY?P1=JAMMER&P2=false`);
    await client.sendText(to, "Turning off Jammer");
  }
}

async function setupJammer(enable, client, to) {
  const baseUrl = process.env.DEVICE_URL;
  await axios.get(`${baseUrl}/APPLY?P1=JAMMODE&P2=2`);
  await axios.get(`${baseUrl}/APPLY?P1=JAMFRQ1&P2=433.92`);
  await axios.get(`${baseUrl}/APPLY?P1=JAMFRQ2&P2=428.92`);
  await axios.get(`${baseUrl}/APPLY?P1=JAMMER&P2=${enable}`);
  await client.sendText(to, `Activating Jammer on 428-433Mhz`);
}
