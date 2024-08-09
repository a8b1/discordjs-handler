import { escape } from "querystring";
import { Apple } from "../../utils/Apple";
import { ModalMessageModalSubmitInteraction } from "discord.js";

export default (client: Apple) => {
    client.on('interactionCreate', async interaction => {
        if(interaction.isAutocomplete()) {
            const focusedOption = interaction.options.getFocused(true);
            const interactionComponent = client.collections.components.autoCompleteInteraction.get(focusedOption.name);
            if(interactionComponent) await interactionComponent.run(client, interaction);
        } else if(interaction.isAnySelectMenu()) {
            const menuComponent = client.collections.components.selectMenus.get(interaction.customId);
            if(menuComponent) await menuComponent.run(client, interaction)
        } else if(interaction.isButton()) {
            const buttonComponent = client.collections.components.buttons.get(interaction.customId);
            if(buttonComponent) await buttonComponent.run(client, interaction);
        } else if(interaction.isModalSubmit()) {
            const modalSubmission = client.collections.components.modals.get(interaction.customId);
            if(modalSubmission) await modalSubmission.run(client, interaction as ModalMessageModalSubmitInteraction);
        }
    })
}