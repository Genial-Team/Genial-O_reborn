import {Express} from "express";
import {REST, Routes} from "discord.js";
import {findCommands} from "../../bot/handleCommandAndEvent";

const botCommand = findCommands();

const refreshCommandRoute = (app: Express) => {
    // @ts-ignore
    let post = app.get('/refresh-command', (req, res) => {
        const body = req.body;
        const headers = req.headers;

            // If the token is correct, refresh the command
            (async () => {
                try {
                    if (!process.env.DISCORD_TOKEN || !process.env.DISCORD_CLIENT_ID) return global.logger.error('bot token or ID is undefined');

                    const rest = new REST().setToken(process.env.DISCORD_TOKEN ? process.env.DISCORD_TOKEN : '');
                    global.logger.info(`Started refreshing ${botCommand.length} application (/) commands.`);

                    // The put method is used to fully refresh all commands in the guild with the current set
                    const data: any = await rest.put(
                        Routes.applicationGuildCommands(process.env.DISCORD_CLIENT_ID, process.env.DISCORD_GUILD_ID ? process.env.DISCORD_GUILD_ID : ''),
                        {body: botCommand.map((command) => command.data.toJSON())},
                    );

                    global.logger.info(`Successfully reloaded ${data.length} application (/) commands.`);
                    return res.status(200).send('OK');
                } catch (error) {
                    // And of course, make sure you catch and log any errors!
                    console.error(error);
                    global.logger.error('Error while refreshing command');
                    return res.status(500).send('Internal server error');
                }
            })();
    });
}

export default refreshCommandRoute;