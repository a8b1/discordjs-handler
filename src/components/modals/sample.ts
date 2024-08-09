import { ModalComponent } from "../../types/Components";

const ageModalSubmit = new ModalComponent({
    customId: 'sample_modal',
    run: async (client, interaction) => {
        return interaction.reply({
            content: `Your age is ${interaction.fields.getTextInputValue('ageInput')} and your hobbies are \`${interaction.fields.getTextInputValue('hobbiesInput')}\``
        })
    },
});

export default ageModalSubmit;