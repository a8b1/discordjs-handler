import path from "path";
import { Apple } from "../utils/Apple";
import { readdirSync } from "fs";
import { MessageContextMenuCommand, PrefixCommand, SlashCommand, UserContextMenuCommand } from "../../types/Commands";


const handleCommand = async (client: Apple) => {
    const handlersDir = path.join(__dirname, '../../commands');
    const typesDir = readdirSync(handlersDir);
    for (const types of typesDir) {
        const categories = readdirSync(path.join(handlersDir, types));
        for (const category of categories) {
            const files = readdirSync(path.join(handlersDir, types, category)).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
            await Promise.all(files.map(async (file) => {
                const filePath = path.join(handlersDir, types, category, file);
                const moduleFile = (await import(filePath)).default as PrefixCommand | SlashCommand | UserContextMenuCommand | MessageContextMenuCommand;
                // makking sure it contains name and run exports
                if (moduleFile) {
                    if (moduleFile instanceof PrefixCommand) {
                        client.collections.prefix.set(moduleFile.name, moduleFile);
                        if (moduleFile.aliases && Array.isArray(moduleFile.aliases)) {
                            moduleFile.aliases.forEach(alias => client.collections.prefixAliases.set(alias, moduleFile.name));
                        }
                        moduleFile.category = category;
                    } else if(moduleFile) {
                        client.collections.interactionCommands.set(moduleFile.name, moduleFile);
                        client.applicationCommandsArray.push(moduleFile);
                    }
                    console.log(`${moduleFile instanceof PrefixCommand ? 'Prefix' : moduleFile instanceof SlashCommand ? 'Interaction' : moduleFile instanceof UserContextMenuCommand ? 'UserContext' : "MessageContext"} : `.gray + `${category}/${file}`.green);
                } else {
                    console.log('Exprort Error: '.red + `${category}/${file}`.green.dim);
                }
            }))
        }
    }
};

export default handleCommand;