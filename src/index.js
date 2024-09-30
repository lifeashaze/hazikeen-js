require('dotenv/config');
const { Client, GatewayIntentBits } = require('discord.js');
const { CommandKit } = require("commandkit")
const { startDBWatcher } = require("./helpers/dbWatcher");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});


new CommandKit({
    client,
    eventsPath: `${__dirname}/events`,
    commandsPath: `${__dirname}/commands`,
    bulkRegister: true,
})

startDBWatcher()

client.login(process.ENV.BOT_TOKEN)

