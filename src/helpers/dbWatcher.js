const { MongoClient } = require("mongodb");
const { Client, GatewayIntentBits } = require("discord.js");

const uri = "mongodb+srv://admin:FwhszxosD5x97RSk@hazikeen.kt06qvo.mongodb.net/";
const mongoClient = new MongoClient(uri);

const client = new Client({
  intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
  ],
});
const channelId = "1215249073590902794"; // ID of the channel to send messages

async function startDBWatcher() {
  try {
    await mongoClient.connect();
    console.log("Connected to the MongoDB server dbWatcher.js");
    const db = mongoClient.db("classroom");
    const collection = db.collection("ITNS_LAB");
    const changeStream = collection.watch();

    changeStream.on("change", async (change) => {
      console.log("Change event:", change);
      if (change.operationType === "update" && change.updateDescription.updatedFields.dueDate) {
        // If there's an update and the dueDate field has been modified, send a notification message to the Discord channel
        try {
          await client.login("MTIxNTI0ODAwNjAxNDU3NDU5Mg.Gwpsru.jhUj82MYtXUJPIEu1adsaRY62zMJBFNG0QS62U");
          const channel = await client.channels.fetch(channelId);
          const changeDescription = formatChangeDescription(change); // Format change description
          await channel.send(`A change has been detected in the due date of an assignment:\n${changeDescription}`);
          await client.destroy(); // Disconnect the bot
        } catch (error) {
          console.error("Error sending notification:", error);
        }
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Helper function to format change description
function formatChangeDescription(change) {
  let description = "";
  description += "Document updated:\n";
  description += `Updated fields: ${JSON.stringify(change.updateDescription.updatedFields, null, 2)}`; // Include the updated fields
  return description;
}

module.exports = { startDBWatcher };
