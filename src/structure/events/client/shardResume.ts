// import { Apple } from "@/structures/utils/Apple";

import { Apple } from "../../utils/Apple";

export default (client: Apple) => {
    client.on('shardResume', (shardId, _replayedEvents) => {
        console.log(`• Shard #${shardId} has been Resumed`.green.dim);
    })
}