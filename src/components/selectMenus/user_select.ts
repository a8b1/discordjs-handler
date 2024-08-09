import { UserSelectMenuInteraction } from "discord.js";
import { SelectMenuComponent } from "../../types/Components";

const userSelect = new SelectMenuComponent<UserSelectMenuInteraction>({
    customId: 'select_component',
    run: async (client, interaction) => {
        return interaction.reply({
            content: `Selected User: ${interaction.users.first()?.username}`,
            ephemeral: true
        })
    },
});

export default userSelect;