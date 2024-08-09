// import { Apple } from "@/structures/utils/Apple";

import { Apple } from "../../utils/Apple"

export default (client: Apple) => {
    client.on('error', (error) => {
        console.error(error)
    })
}