import { PrefixCommands } from "../../../types/Commands";
import { Apple } from "../../utils/Apple";
const defaultPrefix = ','
export default (client: Apple) => {
    client.on('messageCreate', async (message) => {
        /**
         * If message is by a bot, it'll end up in an infinite loop
         */
        if(message.author.bot) return;
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
         */
        if(!command) return;
        /**
         * Run the command 
         */
        await command.run(client, message, args, defaultPrefix);
    })
}