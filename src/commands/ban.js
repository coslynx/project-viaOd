// File: src/commands/ban.js (JavaScript)

const { Client, Intents } = require('discord.js');
const { token } = require('../../config/config');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.once('ready', () => {
    console.log('Bot is ready for banning users');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const { commandName } = interaction;

    if (commandName === 'ban') {
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason');

        if (!user) {
            return interaction.reply('You need to provide a user to ban.');
        }

        if (user.id === interaction.user.id) {
            return interaction.reply('You cannot ban yourself.');
        }

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            return interaction.reply('You do not have permission to ban users.');
        }

        try {
            await interaction.guild.members.ban(user, { reason: reason });
            interaction.reply(`${user.tag} has been banned.`);
        } catch (error) {
            console.error(error);
            interaction.reply('There was an error while trying to ban the user.');
        }
    }
});

client.login(token);