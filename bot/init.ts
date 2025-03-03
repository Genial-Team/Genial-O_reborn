import '../setupGlobalLogger';
import {Client, IntentsBitField, Partials, ActivityType} from 'discord.js';
import path from 'node:path';
import dotenv from 'dotenv';
import {findEvents} from "./handleCommandAndEvent";

dotenv.config({ path: path.resolve(__dirname, '../../../.env.developement.developement') });


const init = () => {

    const client = new Client({
        intents: [
            IntentsBitField.Flags.Guilds,
            IntentsBitField.Flags.GuildMessages,
        ],
        partials: [
            Partials.GuildMember,
            Partials.Message,
            Partials.User,
            Partials.Channel,
            Partials.Reaction,
        ],
        allowedMentions: {
            parse: ['users', 'roles'],
            repliedUser: true
        },
        presence: {
            status: 'online',
            activities: [
                {
                    name: 'with the death itself',
                    type: ActivityType.Playing,
                },
            ],
        }
    });


    client?.login(process.env.DISCORD_TOKEN);

    return client;
}

const botClient= init();
const botEvent= findEvents();

// initialising the bot event handler
botEvent.forEach((event) => {
    if (event.once) {
        botClient.once(event.name, (...args) => event.execute(...args));
    } else {
        botClient.on(event.name, (...args) => event.execute(...args));
    }
});