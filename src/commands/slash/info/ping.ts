import { SlashCommandBuilder } from "discord.js";
import { SlashCommands } from "../../../types/Commands";

const pingCommand: SlashCommands = {
    data: new SlashCommandBuilder(),
    run: async (client, interaction) => {
        return interaction.reply({
            content: 'Pong!',
            ephemeral: true
        });
    },
};

export default pingCommand;