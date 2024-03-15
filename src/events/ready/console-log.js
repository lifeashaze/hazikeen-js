const { Activity } = require("discord.js");

module.exports = (c, client, handler) => {
    console.log(`${c.user.username} is online!`);
    client.user.setActivity({
        name: "Hazikeen",
        type: Activity.STREAMING,
        url: "https://www.google.com/"
    })
};