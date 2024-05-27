// File: src/commands/mute.js (JavaScript)

const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require('moment');
const winston = require('winston');
const { muteRole } = require('../../config/constants');

/**
 * Mutes a user in the server.
 * @param {Client} client - The Discord client
 * @param {Message} message - The message triggering the command
 * @param {Array} args - Command arguments
 */
const execute = async (client, message, args) => {
    if (!message.member.hasPermission('MANAGE_ROLES')) {
        return message.reply('You do not have permission to use this command.');
    }

    const target = message.mentions.members.first();
    if (!target) {
        return message.reply('Please mention a user to mute.');
    }

    const muteDuration = args[1];
    if (!muteDuration) {
        return message.reply('Please specify the mute duration.');
    }

    const muteReason = args.slice(2).join(' ') || 'No reason provided';

    const muteRole = message.guild.roles.cache.find(role => role.name === muteRole);
    if (!muteRole) {
        winston.error('Mute role not found.');
        return message.reply('Mute role not found. Please contact an administrator.');
    }

    try {
        await target.roles.add(muteRole);
        await message.reply(`${target} has been muted for ${muteDuration}. Reason: ${muteReason}`);

        setTimeout(async () => {
            await target.roles.remove(muteRole);
            message.channel.send(`${target} has been unmuted after ${muteDuration}.`);
        }, moment.duration(muteDuration).asMilliseconds());
    } catch (error) {
        winston.error(`Failed to mute user: ${error.message}`);
        message.reply('Failed to mute the user. Please try again later.');
    }
};

module.exports = {
    name: 'mute',
    description: 'Mute a user in the server.',
    execute,
};