import fs from 'node:fs';

const findCommands = () => {
    let loadedCommands: any[] = [];
    fs.readdirSync('./src/bot/commands').forEach((dir) => {
        const commands = fs.readdirSync(`./bot/commands/${dir}`).filter((file) => file.endsWith('.ts'));
        for (const file of commands) {
            if (!file.toString().endsWith(".ts")) return;
            const pull = require(`./commands/${dir}/${file}`);
            loadedCommands.push(pull.default);
        }
    });
    return loadedCommands;
}

const findEvents = () => {
    let events: any[] = [];
    fs.readdirSync('./bot/events').forEach((file) => {
        const event = require(`./events/${file}`);
        events.push(event.default);
    });
    return events;
}

export {findEvents, findCommands};