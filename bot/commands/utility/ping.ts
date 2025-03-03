import {Interaction, InteractionCollector, InteractionResponse, SlashCommandBuilder} from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  async execute(interaction: any) {
    console.log('intempting to ping')
   return await interaction.reply("Pong!");
  },
};