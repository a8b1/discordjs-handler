import { UserContextMenuCommand } from "../../../types/Commands";

const GetUser = new UserContextMenuCommand({
    name: 'Get User',
    run: async (client, interaction) => {
        const targetUser = interaction.targetMember;
        return interaction.reply({
            content: `Targetted on \`${targetUser?.user.username}\` | \`${interaction.targetUser.displayName}\``,
            ephemeral: true
        })
    },
});

export default GetUser;