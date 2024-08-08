import { Document, model, Schema, SchemaTypes } from "mongoose";
import botConfig from "../structure/config/baseConfig";

interface PrefixSchema extends Document {
    guildId: string;
    prefix: string;
}

const schema = new Schema<PrefixSchema>({
    guildId: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
    },
    prefix: {
        type: SchemaTypes.String,
        default: botConfig.prefix
    }
});

export default model<PrefixSchema>('guildConfiguration', schema);