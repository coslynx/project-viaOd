// constants.js

const Discord = require('discord.js');
const dotenv = require('dotenv');
const moment = require('moment');
const winston = require('winston');

dotenv.config();

const client = new Discord.Client();
const token = process.env.DISCORD_TOKEN;
const PREFIX = '!';
const mutedRole = 'Muted';
const logChannel = 'mod-logs';
const databaseURL = process.env.DATABASE_URL;

module.exports = {
  client,
  token,
  PREFIX,
  mutedRole,
  logChannel,
  databaseURL,
};