// config.js

// Import required packages
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Define configuration settings
module.exports = {
  discordToken: process.env.DISCORD_TOKEN,
  prefix: process.env.PREFIX,
  botOwner: process.env.BOT_OWNER_ID,
  logChannel: process.env.LOG_CHANNEL_ID,
  databaseURL: process.env.DATABASE_URL,
  errorWebhook: process.env.ERROR_WEBHOOK_URL,
  successWebhook: process.env.SUCCESS_WEBHOOK_URL
};