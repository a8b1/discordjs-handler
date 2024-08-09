import { SlashCommandBuilder } from "discord.js";
import { SlashCommands } from "../../../types/Commands";
import { ActionRowBuilder, RoleSelectMenuBuilder } from "@discordjs/builders";

const roleSelectCommand : SlashCommands = {
    data: new SlashCommandBuilder()
        .setName('roleselect')
        .setDescription('responds with the sample string select menu'),
    run: async (client, interaction) => {
        const row = new ActionRowBuilder<RoleSelectMenuBuilder>()
            .setComponents(
                new RoleSelectMenuBuilder()
                    .setCustomId('role_select')
                    .setPlaceholder('select roles')
                    .setMinValues(1)
                    .setMaxValues(1)
            );

        return interaction.reply({
            content: 'role select',
            components: [row]
        })
    }
};

export default roleSelectCommand;