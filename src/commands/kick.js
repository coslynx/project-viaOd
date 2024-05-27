// File: src/commands/kick.js (JavaScript)

const { Client, Intents } = require('discord.js');
const { token } = require('../../config/config');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    console.log('Ready to kick users!');
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'kick') {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        if (!user) {
            return interaction.reply('User not found.');
        }

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            return interaction.reply('Member not found.');
        }

        try {
            await member.kick(reason);
            interaction.reply(`Successfully kicked ${user.tag}.`);
        } catch (error) {
            console.error(error);
            interaction.reply('Failed to kick the user.');
        }
    }
});

client.login(token);