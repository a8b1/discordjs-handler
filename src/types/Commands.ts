import { ApplicationCommandOptionData, ApplicationCommandType, ChannelType, ChatInputApplicationCommandData, ChatInputCommandInteraction, ContextMenuCommandBuilder, ContextMenuCommandType, InteractionResponse, Message, PermissionResolvable, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, UserContextMenuCommandInteraction } from "discord.js";
import { Apple } from "../structure/utils/Apple";

export interface PrefixCommands {
    name: string;
    description?: string;
    aliases?: string[];
    cooldown?: number;
    category?: string;
    su?: boolean;
    permissions?: PermissionResolvable[];
    run: (client: Apple, message: Message, args: string[], prefix: string) => Promise<Message | void>;
};

export class PrefixCommand implements PrefixCommands {
    name: string;
    description?: string | undefined;
    aliases?: string[] | undefined;
    cooldown?: number | undefined;
    category?: string | undefined;
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
        this.permissions = options.permissions;
        this.run = options.run;
    }
}
export interface SlashCommands {
    name: string;
    default_member_permissions?: PermissionResolvable;
    description: string;
    dm_permission?: boolean;
    nsfw?: boolean;
    type?: ApplicationCommandType.ChatInput;
    options?: ApplicationCommandOptionData[];
    run: (client: Apple, interaction: ChatInputCommandInteraction) => Promise<InteractionResponse | void>;
}

export class SlashCommand {
    name: string;
    description: string;
    type?: ApplicationCommandType.ChatInput;
    nsfw?: boolean;
    dm_permission?: boolean;
    default_member_permissions?: PermissionResolvable;
    options?: ApplicationCommandOptionData[];
    run: (client: Apple, interaction: ChatInputCommandInteraction) => Promise<InteractionResponse | void>;

    constructor(op: SlashCommands) {
        this.name = op.name;
        this.description = op.description;
        this.type = ApplicationCommandType.ChatInput;
        this.nsfw = op.nsfw;
        this.dm_permission = op.dm_permission;
        this.default_member_permissions = op.default_member_permissions;
        this.options = op.options;
        this.run = op.run;
    }
}
