import { StringSelectMenuInteraction } from "discord.js";
import { SelectMenuComponent } from "../../types/Components";

const stringSelect = new SelectMenuComponent<StringSelectMenuInteraction>({
    customId: 'string_select',
    run: async (client, interaction) => {
        return interaction.reply({
            content: `Selected Option: **${interaction.values[0]}**`
        })
    },
});

export default stringSelect