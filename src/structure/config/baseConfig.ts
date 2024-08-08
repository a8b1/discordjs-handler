interface BotConfig {
    prefix: string;
    su: string[];
}
const botConfig: BotConfig = {
    prefix: ',',
    /**
     * Super users, those who can access every commands on the planet
     */
    su: [
        // '760018214259261490'
    ]
}

export default botConfig;