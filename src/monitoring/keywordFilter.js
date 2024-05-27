// File: src/monitoring/keywordFilter.js (JavaScript)

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const bannedKeywords = ['badword1', 'badword2', 'badword3'];

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    for (const keyword of bannedKeywords) {
        if (message.content.toLowerCase().includes(keyword)) {
            // Perform action to handle message with banned keyword
            // For example: delete the message, warn the user, etc.
            message.delete();
            message.channel.send(`${message.author}, please refrain from using inappropriate language.`);
            break;
        }
    }
});

client.login('your-bot-token'); // Replace 'your-bot-token' with your actual bot token

module.exports = client;