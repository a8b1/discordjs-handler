import { ButtonComponent } from "../../types/Components";

const hiButtonInteraction = new ButtonComponent({
    customId: 'button_component',
    run: async (client, interaction) => {
        return interaction.reply({
            content: 'ephemeral message from \`components/buttons\`',
            ephemeral: true
        })
    },
});

export default hiButtonInteraction;