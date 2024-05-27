// File: src/index.js (JavaScript)

// Import necessary modules
const Discord = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
const { prefix } = require('./config/constants');
const bot = require('./bot');

// Load environment variables from .env file
dotenv.config();

// Create a new Discord client
const client = new Discord.Client();

// Set up event listeners
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  // Check if the message starts with the bot's prefix
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  // Separate the command and arguments
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  // Execute the corresponding command
  if (command === 'mute') {
    bot.mute(message, args);
  } else if (command === 'kick') {
    bot.kick(message, args);
  } else if (command === 'ban') {
    bot.ban(message, args);
  } else {
    message.channel.send('Invalid command. Please try again.');
  }
});

// Log in to Discord with the bot token
client.login(process.env.DISCORD_TOKEN);