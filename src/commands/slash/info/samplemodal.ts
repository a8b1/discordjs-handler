import { ActionRowBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { SlashCommands } from "../../../types/Commands";

const modalCommand : SlashCommands = {
    data: new SlashCommandBuilder()
        .setName('samplemodal')
        .setDescription('gimme yo age'),
    run: async (client, interaction) => {
        const modal = new ModalBuilder()
			.setCustomId('sample_modal')
			.setTitle('car meow');

		// Add components to modal

		// Create the text input components
		const favoriteColorInput = new TextInputBuilder()
			.setCustomId('ageInput')
		    // The label is the prompt the user sees for this input
			.setLabel("What's your age?")
		    // Short means only a single line of text
			.setStyle(TextInputStyle.Short);

		const hobbiesInput = new TextInputBuilder()
			.setCustomId('hobbiesInput')
			.setLabel("What's some of your favorite hobbies?")
		    // Paragraph means multiple lines of text.
			.setStyle(TextInputStyle.Paragraph);

		// An action row only holds one text input,
		// so you need one action row per text input.
		const firstActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(favoriteColorInput);
		const secondActionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(hobbiesInput);

		// Add inputs to the modal
		modal.addComponents(firstActionRow, secondActionRow);
		await interaction.showModal(modal);
		return;
    }
};

export default modalCommand