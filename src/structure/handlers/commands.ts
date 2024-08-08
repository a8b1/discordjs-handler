import path from "path";
import { Apple } from "../utils/Apple";
import { readdirSync } from "fs";
import { PrefixCommand, SlashCommand } from "../../types/Commands";

const handleCommand = async (client: Apple) => {
    const handlersDir = path.join(__dirname, '../../commands');
    const typesDir = readdirSync(handlersDir);
    for (const types of typesDir) {
        const categories = readdirSync(path.join(handlersDir, types));
        for (const category of categories) {
            const files = readdirSync(path.join(handlersDir, types, category)).filter(f => f.endsWith('.ts') || f.endsWith('.js'));
            await Promise.all(files.map(async (file) => {
                const filePath = path.join(handlersDir, types, category, file);
                const moduleFile = (await import(filePath)).default as PrefixCommand | SlashCommand;
                // makking sure it contains name and run exports
                if (moduleFile) {
                    if (moduleFile instanceof PrefixCommand) {
                        client.collections.prefix.set(moduleFile.name, moduleFile);
                        if (moduleFile.aliases && Array.isArray(moduleFile.aliases)) {
                            moduleFile.aliases.forEach(alias => client.collections.prefixAliases.set(alias, moduleFile.name));
                        }
                        moduleFile.category = category;
                        console.log('Loaded: '.gray + `${category}/${file}`.green);
                    } else if(moduleFile) {
                        client.collections.interactionCommands.set(moduleFile.name, moduleFile);
                        client.applicationCommandsArray.push(moduleFile);
                    }
                } else {
                    console.log('Command Exprort Error: '.red + `${category}/${file}`.green.dim);
                }
            }))
        }
    }
};

export default handleCommand;