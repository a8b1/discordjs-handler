import { ChannelType, GuildMember, PermissionResolvable } from "discord.js";
import { PrefixCommands } from "../../../types/Commands";
import { Apple } from "../../utils/Apple";
import baseConfig from "../../config/baseConfig";
const defaultPrefix = ','
export default (client: Apple) => {
    client.on('messageCreate', async (message) => {
        /**
         * If message is by a bot, it'll end up in an infinite loop
         * !message.guildId disables the command if it's occured in dms
         */ 
        if (message.author.bot || !message.guildId || !message.guild?.members.me?.permissions.has('SendMessages')) return;
        /**
         * Command arguments (aka message splits)
         */
        const args = message.content.slice(defaultPrefix.length).trim().split(/ +/);
        /**
         * the first thing will be the command
         */
        const commandInput = args.shift()?.toLocaleLowerCase() as string;
        /**
         * Finds the command in the prefix command collection
         */
        const command = client.collections.prefix.get(commandInput) || client.collections.prefix.get(client.collections.prefixAliases.get(commandInput) as string) as PrefixCommands;
        /**
         * No command? eat five star and do nothing
         * Optionally you can create a message here if there is no such command in the list
         */
        if (!command) {
            // return message.channel.send({
            //     content: `\`${defaultPrefix + commandInput}\` is not a command`
            // })
            return;
        };
        /**
         * Embed permission is required
         */
        if(!message.guild?.members.me?.permissions.has('EmbedLinks')) {
            return message.channel.send({
                content: '**Embed Links** permission is required to execute the commands!'
            })
        }
        /**
         * Handle the permissions
         * Not declared is equal to allowing access to execute the command who just has a "SendMessages" permission
         */
        if (command.permissions) {
            /**
             * The required permissions which is added in the bot command options
            */
            const requiredPermissions = command.permissions;
            const userPermissionsResult = checkPermissions(message.member as GuildMember, requiredPermissions);

            if (!userPermissionsResult.hasPermission) {
                return message.channel.send({
                    embeds: [{
                        description: `❌ You don't have enough permission${userPermissionsResult.missingPermissions.length > 1 ? 's' : ''} to use this command.\n> **Pending Permission${userPermissionsResult.missingPermissions.length > 1 ? "s" : ''}:** ${userPermissionsResult.missingPermissions.map(permission => `\`${permission.toLocaleString().replace(/([A-Z])(?=[a-z])/g, ' $1').toLowerCase().replace('guild', 'server').replace(/\b\w/g, char => char.toUpperCase()).trim()}\``).join(', ')}`
                    }]
                })
            };

            const botPermissionResult = checkPermissions(message.guild?.members.me as GuildMember, requiredPermissions);

            if (!botPermissionResult.hasPermission) {
                return message.channel.send({
                    embeds: [{
                        description: `❌ I don't have enough permission${botPermissionResult.missingPermissions.length > 1 ? 's' : ''} to use this command.\n> **Pending Permission${botPermissionResult.missingPermissions.length > 1 ? "s" : ''}:** ${botPermissionResult.missingPermissions.map(permission => `\`${permission.toLocaleString().replace(/([A-Z])(?=[a-z])/g, ' $1').toLowerCase().replace('guild', 'server').replace(/\b\w/g, char => char.toUpperCase()).trim()}\``).join(', ')}`
                    }]
                })
            }
        }

        if(command.su && !baseConfig.su.includes(message.author.id)) {
            return message.channel.send({
                embeds: [{
                    description: '❌ You\'re not allowed to execute this command',
                    color: 0xFF0000
                }]
            })
        }
        /**
         * Run the command 
         */
        await command.run(client, message, args, defaultPrefix);
    })
}

function checkPermissions(member: GuildMember, permissions: PermissionResolvable[]): { hasPermission: boolean, missingPermissions: PermissionResolvable[] } {
    const missingPermissions: PermissionResolvable[] = [];
    for (const permission of permissions) {
        if (!member.permissions.has(permission)) {
            missingPermissions.push(permission);
        }
    }

    return {
        hasPermission: missingPermissions.length === 0,
        missingPermissions: missingPermissions
    };
}