// import { Apple } from "@/structures/utils/Apple";

import { Apple } from "../../utils/Apple";

export default (client: Apple) => {
    client.on('shardReady', (shardId, _unavailableGuilds) => {
        console.log(`• Shard #${shardId} is Ready`.green);
    });
}