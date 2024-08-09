import { ApplicationCommandOptionData, ApplicationCommandType, ChannelType, ChatInputApplicationCommandData, ChatInputCommandInteraction, ContextMenuCommandBuilder, ContextMenuCommandType, InteractionResponse, Message, MessageContextMenuCommandInteraction, PermissionFlagsBits, PermissionResolvable, PermissionsBitField, SlashCommandBuilder, SlashCommandOptionsOnlyBuilder, UserContextMenuCommandInteraction } from "discord.js";
import { Apple } from "../structure/utils/Apple";

export interface PrefixCommands {
    name: string;
    description?: string;
    aliases?: string[];
    cooldown?: number;
    category?: string;
    su?: boolean;
    permissions?: PermissionResolvable |  PermissionResolvable[];
    run: (client: Apple, message: Message, args: string[], prefix: string) => Promise<Message | void>;
};

export class PrefixCommand {
    /**
     * The command name (will use as <prefix><name>)
     */
    readonly name: string;
    /**
     * The comand description, not required but if you're creating a help menu you can use this
     */
    readonly description?: string | undefined;
    /**
     * Allias? yep
     */
    readonly aliases?: string[] | undefined;
    /**
     * The message cooldown, prevent spamming?
     */
    readonly cooldown?: number | undefined;
    /**
     * 
     */
    category?: string | undefined;
    /**
     * Whether the command is only for super user or not?
     */
    readonly su?: boolean | undefined;
    /**
     * The permissions required for the command (both user and both require the same)
     * 
     * @remarks
     * Can have both single and multiple permissions..
     */
    readonly permissions?: PermissionResolvable |  PermissionResolvable[];
    /**
     * The execution function, where you get the response
     */
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
    data: SlashCommandOptionsOnlyBuilder;
    run: (client: Apple, interaction: ChatInputCommandInteraction) => Promise<InteractionResponse | void>;
}
/**
 * Interface common in context menu
 */
interface ContextMenu {
    data: ContextMenuCommandBuilder
}
/**
 * An Interface for User Context Menu
 */
export interface UserContextMenu extends ContextMenu {
    run: (client: Apple, interaction: UserContextMenuCommandInteraction) => Promise<InteractionResponse | void>;
}
/**
 * An Interface for Message Context Menu
 */
export interface MessageContextMenu extends ContextMenu {
    run: (client: Apple, interaction: MessageContextMenuCommandInteraction) => Promise<InteractionResponse | void>;
}