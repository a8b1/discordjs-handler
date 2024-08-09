// import { Apple } from "@/structures/utils/Apple";
// import botconfig from "@/structures/config/botconfig";

import botConfig from "../../config/baseConfig";
import { Apple } from "../../utils/Apple";

export default (client: Apple) => {
    client.on('debug', (message) => {
        if(botConfig.debug) {
            console.log(message.gray.dim);
        }
    })
}