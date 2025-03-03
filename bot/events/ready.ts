import {Client} from "discord.js";
export default {
    name: 'ready',
    once: true,
    execute: (client: Client) => {
        global.logger.info(`Logged in as ${client.user ? client.user.tag : undefined}!`);
    }
}