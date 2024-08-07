import { ActivityType, Client, Partials } from "discord.js";
import 'colors';
import dotenv from 'dotenv';
dotenv.config();

export class Apple extends Client {
    // collections
    // applicationCommandsArray: any[]

    constructor() {
        super({
            intents: [
                // Only use what you want
                // "AutoModerationConfiguration",
                // "AutoModerationExecution",
                // "DirectMessagePolls",
                // "DirectMessageReactions",
                // "DirectMessageTyping",
                // "DirectMessages",
                // "GuildBans",
                "GuildEmojisAndStickers",
                // "GuildIntegrations",
                // "GuildInvites",
                "GuildMembers",
                // "GuildMessagePolls",
                // "GuildMessageReactions",
                "GuildMessageTyping",
                "GuildMessages",
                // "GuildModeration",
                // "GuildPresences",
                // "GuildScheduledEvents",
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

    }
    public start = async (): Promise<void> => {
        await this.login(process.env.DISCORD_TOKEN);
    }
}