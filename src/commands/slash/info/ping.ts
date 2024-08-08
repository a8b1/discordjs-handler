import { SlashCommand } from "../../../types/Commands";

const pingCommand = new SlashCommand({
    name: 'ping',
    description: 'Shows how fast can this app respond',
    run: async (client, interaction) => {
        return interaction.reply({
            content: 'Pong!',
            ephemeral: true
        });
    },
});

export default pingCommand;