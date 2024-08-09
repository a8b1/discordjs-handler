import { ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder } from "discord.js";
import { SlashCommands } from "../../../types/Commands";

const buttonCommand: SlashCommands = {
    data: new SlashCommandBuilder()
        .setName('button').setDescription('Can interact with the components inside the components folder'),
    run: async (client, interaction) => {
        const row = new ActionRowBuilder<ButtonBuilder>()
            .setComponents(
                new ButtonBuilder()
                    .setCustomId('button_component')
                    .setLabel('Click meh')
                    .setStyle(ButtonStyle.Secondary)
            );

        return interaction.reply({
            content: 'This components will respond using the code inside the \`components/buttons\` folder',
            components: [row]
        });
    },
};

export default buttonCommand;