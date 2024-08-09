import { ActionRowBuilder, ComponentType, SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from "discord.js";
import { SlashCommands } from "../../../types/Commands";

const collectionSelectCommand: SlashCommands = {
    data: new SlashCommandBuilder()
        .setName('collectionselect')
        .setDescription('means this select menu will expire after a time'),
    run: async (client, interaction) => {
        let row = new ActionRowBuilder<StringSelectMenuBuilder>().setComponents(
            new StringSelectMenuBuilder()
                .setCustomId('collect_select')
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

        const theInteraction = await interaction.reply({
            content: 'Here it is. This selection menu will expire after 30 seconds and won\'t work again if it\'s not declared in the components folder\nOnly the user who executed this command can run select.. (filter function in the component collector)',
            components: [row]
        });

        const collector = theInteraction.createMessageComponentCollector({componentType: ComponentType.StringSelect, filter:(i) => i.user.id === interaction.user.id, time: 30e3 });

        collector.on('collect', async interaction => {
            /**
             * Using return will stop the collector ig
             */
            return interaction.reply({
                content: `You clicked on ${interaction.values[0]}`,
                ephemeral: true
            });
        })
    },
};

export default collectionSelectCommand;