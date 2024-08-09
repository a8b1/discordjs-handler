import { ApplicationCommandType, ContextMenuCommandBuilder } from "discord.js";
import { MessageContextMenu } from "../../../types/Commands";

const SayCommand : MessageContextMenu = {
    data: new ContextMenuCommandBuilder()
        .setName('Say')
        .setType(ApplicationCommandType.Message),
    run: async (client, interaction) =>  {
        return interaction.reply({
            content: `${interaction.targetMessage.author.displayName} says \`${interaction.targetMessage.cleanContent}\``,
            ephemeral: true
        })
    },
};

export default SayCommand