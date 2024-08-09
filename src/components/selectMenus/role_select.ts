import { RoleSelectMenuInteraction } from "discord.js";
import { SelectMenuComponent } from "../../types/Components";

const roleSelect = new SelectMenuComponent<RoleSelectMenuInteraction>({
    customId: 'role_select',
    run: async (client, interaction) => {
        return interaction.reply({
            content: `Selected Role: <@&${interaction.roles.first()?.id}>`
        })
    },
});
export default roleSelect;


// For multiple user select

// const roleSelect = new SelectMenuComponent<RoleSelectMenuInteraction>({
//     customId: 'role_select',
//     run: async (client, interaction) => {
//         return interaction.reply({
//             content: `Selected Role: ${interaction.roles.map(role => `<@&${role.id}>`).join(', ')}`
//         })
//     },
// })