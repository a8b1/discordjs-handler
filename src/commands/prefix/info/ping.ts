import { TextChannel } from "discord.js";
import { PrefixCommand } from "../../../types/Commands";

const pingCommand = new PrefixCommand({
    name: 'ping',
    aliases: ['pong'],
    su: true,
    run: async (client, message, args, prefix) => {
        return (message.channel as TextChannel).send({
            content: 'This is a sample commnand'
        })
    }
});

export default pingCommand;