import { EmbedBuilder } from "discord.js";
import { PrefixCommand } from "../../../types/Commands";
import prefixConfiduration from "../../../models/prefixConfiduration";

const prefixChange = new PrefixCommand({
    name: 'prefix',
    su: true,
    run: async (client, message, args, prefix) => {
        const wrongInput = new EmbedBuilder()
            .setDescription(`❌ Wrong Input\n> **Usage**: \`${prefix}prefix set [new-prefix]\``)
            .setColor(0xFF0000);

        if(args[0] == 'set' && args[1]) {
            if(args[1].length > 5) {
                return message.channel.send({
                    embeds: [new EmbedBuilder(wrongInput.toJSON()).setDescription(`❌ **Limit exceeded**\nNew prefix length must be 5 or less\n> **Usage**: \`${prefix}prefix set [new-prefix]\``)]
                })
            }
            await prefixConfiduration.findOneAndUpdate({
                guildId: message.guild?.id,
                prefix: args[1]
            });
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`🫡 Prefix changed from \`${prefix}\` to \`${args[1]}\``)
                ]
            })
        }

        return message.channel.send({
            embeds: [wrongInput]
        })
    },
});

export default prefixChange