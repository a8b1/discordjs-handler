import { AnySelectMenuInteraction, AutocompleteInteraction, ButtonInteraction, InteractionResponse, ModalMessageModalSubmitInteraction, ModalSubmitInteraction } from "discord.js";
import { Apple } from "../structure/utils/Apple";

export interface ButtonComponentInterface {
    customId: string;
    run: (client: Apple, interaction: ButtonInteraction) => Promise<InteractionResponse | void>;
}

export class ButtonComponent {
    readonly customId: string;
    readonly run: (client: Apple, interaction: ButtonInteraction) => Promise<InteractionResponse | void>;

    constructor (op: ButtonComponentInterface) {
        this.customId = op.customId;
        this.run = op.run;
    }
};

export interface SelectMenuComponentInterface<T extends AnySelectMenuInteraction> {
    customId: string;
    run: (client: Apple, interaction: T) => Promise<InteractionResponse | void>;
}

export class SelectMenuComponent<T extends AnySelectMenuInteraction>{
    readonly customId: string;
    readonly run: (client: Apple, interaction: T) => Promise<InteractionResponse | void>;

    constructor (op: SelectMenuComponentInterface<T>) {
        this.customId = op.customId;
        this.run = op.run;
    }
}

export interface ModalComponentInterface {
    customId: string;
    run: (client: Apple, interaction: ModalMessageModalSubmitInteraction) => Promise<InteractionResponse | void>;
}

export class ModalComponent implements ModalComponentInterface {
    readonly customId: string;
    readonly run: (client: Apple, interaction: ModalMessageModalSubmitInteraction) => Promise<InteractionResponse | void>;
    
    constructor(options: ModalComponentInterface) {
        this.customId = options.customId;
        this.run = options.run;
    }
};

export interface AutoCompleteInteractionInterface {
    name: string;
    run: (client: Apple, interaction: AutocompleteInteraction) => Promise<AutoCompleteInteraction | void>
}

export class AutoCompleteInteraction implements AutoCompleteInteractionInterface {
    readonly name: string;
    readonly run: (client: Apple, interaction: AutocompleteInteraction) => Promise<AutoCompleteInteraction | void>;

    constructor(options: AutoCompleteInteractionInterface) {
        this.name = options.name;
        this.run = options.run;
    }
}