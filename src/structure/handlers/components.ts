import path from "path";
import { Apple } from "../utils/Apple";
import { readdirSync } from "fs";
import { AutoCompleteInteraction, AutoCompleteInteractionInterface, ButtonComponent, ButtonComponentInterface, ModalComponent, ModalComponentInterface, SelectMenuComponent, SelectMenuComponentInterface } from "../../types/Components";
import { AnySelectMenuInteraction } from "discord.js";

const handleComponents = async (client: Apple) => {
    const componentsDir = path.join(__dirname, '../../components');
    const typesDir = readdirSync(componentsDir);
    for(const types of typesDir) {
        const files = readdirSync(path.join(componentsDir, types)).filter(f => f.endsWith('.js') || f.endsWith('.ts'));
        await Promise.all(files.map(async file => {
            const filePath = path.join(componentsDir, types, file);
            const componentFile = await (await import(filePath)).default as ButtonComponentInterface | SelectMenuComponentInterface<AnySelectMenuInteraction> | ModalComponentInterface | AutoCompleteInteractionInterface;
            if(componentFile) {
                if(componentFile instanceof ButtonComponent) {
                    client.collections.components.buttons.set(componentFile.customId, componentFile);
                } else if(componentFile instanceof SelectMenuComponent) {
                    client.collections.components.selectMenus.set(componentFile.customId, componentFile);
                } else if(componentFile instanceof ModalComponent) {
                    client.collections.components.modals.set(componentFile.customId, componentFile);
                } else if(componentFile instanceof AutoCompleteInteraction) {
                    client.collections.components.autoCompleteInteraction.set(componentFile.name, componentFile);
                }
            } else {
                console.log('Exprort Error: '.red + `${types}/${file}`.green.dim);

            }
        }))
    }
} 

export default handleComponents;