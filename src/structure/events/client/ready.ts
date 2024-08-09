import { version } from "discord.js";
import botConfig from "../../config/baseConfig";
import { Apple } from "../../utils/Apple";

export default (client:  Apple) => {
    client.on('ready', async () => {
        /**
         * Bot Details on ready
         */
        console.log(
            `Bot User: `.green + `${client.user?.tag}`.blue + `\n` +
            `Ping: `.green + `${client.ws.ping}`.blue + `\n` +
            `Guild(s): `.green + `${client.guilds.cache.size} Server(s)`.blue + `\n` +
            `Watching: `.green + `${client.users.cache.size} Members`.blue + `\n` +
            `Prefix: `.green + `${botConfig.prefix}`.blue + `\n` +
            `Discord.js: `.green + `v${version}`.blue + `\n` +
            `Node.js: `.green + `${process.version}`.blue + `\n` +
            `Plattform: `.green + `${process.platform} ${process.arch}`.blue + `\n` +
            `Memory: `.green + `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB`.blue
        );
    })
}