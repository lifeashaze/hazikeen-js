const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder().setName("ping").setDescription("pong!"),
    run: ({interaction, client, handler}) => {
        interaction.reply("Pong!!")
    }
}