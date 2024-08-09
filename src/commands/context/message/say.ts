import { MessageContextMenuCommand } from "../../../types/Commands";

const SayCommand = new MessageContextMenuCommand({
    name: 'Say',
    run: async (client, interaction) =>  {
        return interaction.reply({
            content: `${interaction.targetMessage.author.displayName} says \`${interaction.targetMessage.cleanContent}\``,
            ephemeral: true
        })
    },
});

export default SayCommand