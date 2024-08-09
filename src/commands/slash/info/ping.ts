import { SlashCommandBuilder } from "discord.js";
import { SlashCommands } from "../../../types/Commands";

const pingCommand: SlashCommands = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('shows how fast can this application respond'),
    run: async (client, interaction) => {
        return interaction.reply({
            content: `${client.ws.ping}ms`,
            ephemeral: true
        });
    },
};

export default pingCommand;