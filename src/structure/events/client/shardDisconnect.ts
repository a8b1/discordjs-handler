// import { Apple } from "@/structures/utils/Apple"

import { Apple } from "../../utils/Apple"

export default (client: Apple) => {
    client.on('shardDisconnect', (cloeseEvent, shardId) => {
        console.log(`• Shard #${shardId} Disconnected duo to ${cloeseEvent}`.red.dim)
    })
}