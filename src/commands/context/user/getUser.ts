import { ApplicationCommandType, ContextMenuCommandBuilder } from "discord.js";
import { UserContextMenu } from "../../../types/Commands";

const GetUser: UserContextMenu = {
    data: new ContextMenuCommandBuilder()
        .setName('Who')
        .setType(ApplicationCommandType.User),
    run: async (client, interaction) => {
        const targetUser = interaction.targetMember;
        return interaction.reply({
            content: `Targetted on \`${targetUser?.user.username}\` | \`${interaction.targetUser.displayName}\``,
            ephemeral: true
        })
    },
};

export default GetUser;