import { REST, Routes } from "discord.js";
import { Apple } from "../utils/Apple";

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN as string);

const deployCommands = async (client: Apple) => {
    try {
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID as string), {
                body: client.applicationCommandsArray
            }
        );
    } catch (error) {
        console.error(error);
        // console.log(`• No Application commands`.brightRed)
    }
};

export default deployCommands;