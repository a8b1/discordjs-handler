// import { Apple } from "@/structures/utils/Apple";

import { Apple } from "../../utils/Apple"

export default (client: Apple) => {
    client.on('shardReconnecting', (shardId) => {
        console.log(`• Shard #${shardId} is reconnecting`.red.dim)
    })
}