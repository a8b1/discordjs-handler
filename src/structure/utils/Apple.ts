import { ActivityType, Client, Collection, Partials } from "discord.js";
import 'colors';
import dotenv from 'dotenv';
import { PrefixCommands } from "../../types/Commands";
import path from "path";
import { readdirSync } from "fs";
dotenv.config();

export class Apple extends Client {
    collections : {
        prefix: Collection<string, PrefixCommands>
        prefixAliases: Collection<string, string>
    }
    // applicationCommandsArray: any[]

    constructor() {
        super({
            intents: [
                // Only use what you want
                "AutoModerationConfiguration",
                "AutoModerationExecution",
                "DirectMessagePolls",
                "DirectMessageReactions",
                "DirectMessageTyping",
                "DirectMessages",
                "GuildBans",
                "GuildEmojisAndStickers",
                "GuildIntegrations",
                "GuildInvites",
                "GuildMembers",
                "GuildMessagePolls",
                "GuildMessageReactions",
                "GuildMessageTyping",
                "GuildMessages",
                "GuildModeration",
                "GuildPresences",
                "GuildScheduledEvents",
                "GuildVoiceStates",
                "Guilds",
                "MessageContent"
            ],
            partials: [
                Partials.Channel,
                Partials.Message,
                Partials.User,
                Partials.GuildMember,
                Partials.GuildScheduledEvent,
                Partials.Reaction,
                Partials.ThreadMember
            ],
            presence: {
                activities: [
                    {
                        name: "a8cid servers",
                        type: ActivityType.Watching,
                    }
                ],
                status: 'dnd'
            }
        });

        // this collection and arrray
        this.collections = {
            prefix: new Collection(),
            prefixAliases: new Collection(),
        }

    }
    public start = async (): Promise<void> => {
        const handlersDir =path.join(__dirname, '../../structure/handlers');
        for(const handler of readdirSync(handlersDir).filter(f => f.endsWith('.ts') || f.endsWith('.js'))) {
            const event = await import(path.join(handlersDir, handler));
            await event.default(this);
        }
        await this.login(process.env.DISCORD_TOKEN);
        console.log('Bot online');
    }
}