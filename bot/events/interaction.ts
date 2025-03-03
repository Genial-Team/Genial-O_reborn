import {Interaction, Events, ChatInputCommandInteraction} from "discord.js";
import {findCommands} from "../handleCommandAndEvent";

export default {
    name: Events.InteractionCreate,
    once: false,
    execute: (interaction: ChatInputCommandInteraction) => {
        const { type, commandName } = interaction;
        console.log(
            `Received ${type} command ${commandName}`)

        switch (type) {
            case 2:
                const commandExecutionFile = findCommands().filter( (command) => command.data.name === commandName)[0];

                return commandExecutionFile
                    ? commandExecutionFile.execute(interaction)
                    : interaction.reply({
                    ephemeral: true,
                    content: 'Cette commande n\'existe pas'});
        }
    }
}