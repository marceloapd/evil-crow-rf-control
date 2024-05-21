require("dotenv").config();
const venom = require("venom-bot");
const axios = require("axios");
const wifi = require("node-wifi");

wifi.init({ iface: null });
connectToWiFi();

const authorizedPhones = process.env.AUTHORIZED_PHONES.split(",");

venom
  .create({ session: "session-name" })
  .then((client) => start(client))
  .catch((error) => console.error("Error creating session: ", error));

function connectToWiFi() {
  wifi.connect({ ssid: process.env.WIFI_SSID, password: process.env.WIFI_PASSWORD }, (error) => {
    if (error) {
      console.error("Failed to connect to WiFi: ", error);
    } else {
      console.log("Connected to WiFi");
    }
  });
}

async function start(client) {
  client.onMessage(async (message) => {
    if (typeof message.body === "string") {
      await handleMessage(message, client);
    }
  });
}

async function handleMessage(message, client) {
  const formattedMessage = message.body.toLowerCase().trim();

  try {
    switch (formattedMessage) {
      case "open gate":
        await handleOpenGate(message.from, client);
        break;
      case "open file":
        await handleOpenFile(message.from, client);
        break;
      default:
        if (formattedMessage.startsWith("jammer")) {
          await handleJammer(formattedMessage, message.from, client);
        }
    }
  } catch (error) {
    console.error("Error handling message: ", error);
    await client.sendText(message.from, "An error occurred, please try again.");
  }
}

async function handleOpenGate(from, client) {
  if (authorizedPhones.includes(from)) {
    await sendRawSignal(from, client);
  } else {
    await client.sendText(from, "You are not authorized to open the gate.");
  }
}

async function sendRawSignal(to, client) {
  const response = await axios.get(`${process.env.DEVICE_URL}/SENDRAW?P1=${process.env.RAW_SIGNAL}`);
  await client.sendText(to, "(SEND RAW SIGNAL) Opening gate, please wait...");
  console.log("Response RAW:", response.data);
}

async function handleOpenFile(to, client) {
  await axios.get(`${process.env.DEVICE_URL}/TXSD`);
  const response = await axios.get(`${process.env.DEVICE_URL}/APPLY?P1=CURRENT&P2=vale_do_cedro-gate.sub`);
  await client.sendText(to, "(SEND FILE SIGNAL) Opening gate, please wait...");
  console.log("Response File:", response.data);
}

async function handleJammer(command, to, client) {
  const mode = command.split(" ")[1];
  if (mode === "true") {
    await toggleJammer(true, client, to);
  } else if (mode === "false") {
    await axios.get(`${process.env.DEVICE_URL}/APPLY?P1=JAMMER&P2=false`);
    await client.sendText(to, "Turning off Jammer");
  }
}

async function toggleJammer(enable, client, to) {
  const baseUrl = process.env.DEVICE_URL;
  await axios.get(`${baseUrl}/APPLY?P1=JAMMODE&P2=2`);
  await axios.get(`${baseUrl}/APPLY?P1=JAMFRQ1&P2=433.92`);
  await axios.get(`${baseUrl}/APPLY?P1=JAMFRQ2&P2=428.92`);
  await axios.get(`${baseUrl}/APPLY?P1=JAMMER&P2=${enable}`);
  await client.sendText(to, `Activating Jammer on 428-433Mhz`);
}
