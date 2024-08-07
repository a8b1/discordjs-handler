import { ChannelType, Message, PermissionResolvable } from "discord.js";
import { Apple } from "../structure/utils/Apple";

export interface PrefixCommands {
    name: string;
    description?: string;
    aliases?: string[];
    cooldown?: number;
    category?: string;
    su?: boolean;
    permissions?: PermissionResolvable[];
    // availableIn: ChannelType[];
    run: (client: Apple, message: Message, args: string[], prefix: string) => Promise<Message | void>;
};

export class PrefixCommand implements PrefixCommands {
    name: string;
    description?: string | undefined;
    aliases?: string[] | undefined;
    cooldown?: number | undefined;
    category?: string | undefined;
    // Super user
    su?: boolean | undefined;
    permissions?: PermissionResolvable[];
    run: (client: Apple, message: Message, args: string[], prefix: string) => Promise<Message | void>;

    constructor(options: PrefixCommands) {
        this.name = options.name;
        this.description = options.description;
        this.aliases = options.aliases;
        this.category = options.category;
        this.cooldown = options.cooldown;
        this.su = options.su;
        this.permissions =  options.permissions;
        // this.availableIn = options.availableIn;
        this.run = options.run;
    }
}