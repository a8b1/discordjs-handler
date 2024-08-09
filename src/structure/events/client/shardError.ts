// import { Apple } from "@/structures/utils/Apple";

import { Apple } from "../../utils/Apple";

export default (client: Apple) => {
    client.on('shardError' ,(error, shardId) => {
        console.log(`Shard ${shardId} is eroored`.gray);
        console.error(error);
        console.log(`---------------------------`.gray);
    })
}