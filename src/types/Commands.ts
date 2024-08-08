import { ApplicationCommandOptionData, ApplicationCommandType, ChannelType, ChatInputApplicationCommandData, ChatInputCommandInteraction, ContextMenuCommandBuilder, ContextMenuCommandType, InteractionResponse, Message, MessageContextMenuCommandInteraction, PermissionFlagsBits, PermissionResolvable, PermissionsBitField, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, UserContextMenuCommandInteraction } from "discord.js";
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
    options?: ApplicationCommandOptionData[];
    run: (client: Apple, interaction: ChatInputCommandInteraction) => Promise<InteractionResponse | void>;
}

export class SlashCommand {
    /**
     * Command name
     */
    readonly name: string;
    /**
     * The big bang description for the command
     */
    readonly description: string;
    /**
     * Command type, Not in exports, declared in constructor
     */
    readonly type: ApplicationCommandType.ChatInput;
    /**
     * Whether the command is NSFW
     */
    readonly nsfw?: boolean;
    /**
     * Indicates whether the command is available in direct messages with the application.
     *
     * @remarks
     * By default, commands are visible. Only applicable in global commands
     */
    readonly dm_permission?: boolean;
    /**
     * The set of permissions represented as a bit set for the command.
     */
    readonly default_member_permissions?: PermissionResolvable;
    /**
     * The options of this command.
     */
    readonly options?: ApplicationCommandOptionData[];
    /**
     * The command proprty function, here you define wot to do :walk:
     */
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
/**
 * Interface common in context menu
 */
interface ContextMenu {
    name: string;
    dm_permission?: boolean;
    default_member_permissions?: PermissionResolvable;
}
/**
 * An Interface for User Context Menu
 */
export interface UserContextMenu extends ContextMenu {
    run: (client: Apple, interaction: UserContextMenuCommandInteraction) => Promise<InteractionResponse | void>;
}
/**
 * Class for usercontext menu commands
 */
export class UserContextMenuCommand {
    /**
     * The Name of the command (aka option)
     */
    readonly name: string;
    /**
     * The type of the context menu
     * 
     * @remarks
     * This thing is declared on constructor side
     */
    readonly type?: ContextMenuCommandType;
    /**
     * Indicates whether the command is availale in direct messages with the application
     * 
     * @remarks
     * By default, commands are visible. Applicable only in global commands
     */
    readonly dm_permission?: boolean;
    /**
     * The set of permissions represented as a bit set for the command
     * 
     * @remarks
     * Use PermissionFlagsBits from discord.js 
     * eg: PermissionFlagsBits.SendMessages
     */
    readonly default_member_permissions?: PermissionResolvable;
    /**
     * The required run command whoch
     * @param client - The base client (Extended as Apple)
     * @param interaction - The ContextMenu Interaction, specified for User Context Menu
     * @returns nothing basically
     */
    run: (client: Apple, interaction: UserContextMenuCommandInteraction) => Promise<InteractionResponse | void>;

    constructor(op: UserContextMenu) {
        this.name = op.name;
        this.type = ApplicationCommandType.User
        this.dm_permission = op.dm_permission;
        this.default_member_permissions = op.default_member_permissions;
        this.run = op.run;
    }
}
/**
 * An Interface for Message Context Menu
 */
export interface MessageContextMenu extends ContextMenu {
    run: (client: Apple, interaction: MessageContextMenuCommandInteraction) => Promise<InteractionResponse | void>;
}
/**
 * Class for message context menu commands
 */
export class MessageContextMenuCommand {
    /**
     * The Name of the command (aka option)
     */
    readonly name: string;
    /**
     * The type of the context menu (message or user?)
     * 
     * @remarks
     * This thing is declared on constructor side
     */
    readonly type?: ApplicationCommandType.Message;
    /**
     * Indicates whether the command is availale in direct messages with the application
     * 
     * @remarks
     * By default, commands are visible. Applicable only in global commands
     */
    readonly dm_permission?: boolean;
    /**
     * The set of permissions represented as a bit set for the command
     * 
     * @remarks
     * Use PermissionFlagsBits from discord.js 
     * eg: PermissionFlagsBits.SendMessages
     */
    readonly default_member_permissions?: PermissionResolvable;
    /**
     * The required run command whoch
     * @param client - The base client (Extended as Apple)
     * @param interaction - The ContextMenu Interaction, specified for User Context Menu
     * @returns nothing basically
     */
    run: (client: Apple, interaction: MessageContextMenuCommandInteraction) => Promise<InteractionResponse | void>;

    constructor(op: MessageContextMenu) {
        this.name = op.name;
        this.type = ApplicationCommandType.Message
        this.dm_permission = op.dm_permission ?? false;
        this.default_member_permissions = op.default_member_permissions;
        this.run = op.run;
    }
}