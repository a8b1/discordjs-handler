import { ActionRowBuilder, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { SlashCommands } from "../../../types/Commands";

const stringSelectCommand : SlashCommands = {
    data: new SlashCommandBuilder()
        .setName('stringselect')
        .setDescription('responds with the sample string select menu'),
    run: async (client, interaction) => {
        let row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .setComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('string_select')
                    .setPlaceholder('Select an option')
                    .setMaxValues(1)
                    .setMinValues(1)
                    .setOptions([
                        new StringSelectMenuOptionBuilder()
                            .setLabel('meow')
                            .setDescription('car, vroom vroom')
                            .setValue('meow'),

                        new StringSelectMenuOptionBuilder()
                            .setLabel('cat')
                            .setDescription('This is also known as car, drift')
                            .setValue('cat')
                    ])
            );

            return interaction.reply({
                content: 'Select menu, select some : )',
                components: [row]
            })
    },
};

export default stringSelectCommand;