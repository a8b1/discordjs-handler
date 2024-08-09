import { Apple } from "../../utils/Apple";

export default (client: Apple) => {
    client.on('interactionCreate', async interaction => {
        if(interaction.isContextMenuCommand()) {
            const command = client.collections.interactionCommands.get(interaction.commandName);
            if(command) await command.run(client, interaction as any);
        }
        if(interaction.isCommand()) {
            const command = client.collections.interactionCommands.get(interaction.commandName);
            if(!command) return;
            await command.run(client, interaction as any);
        }
    })
}