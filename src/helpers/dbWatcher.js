const { MongoClient, ObjectId } = require("mongodb");
const { Client, GatewayIntentBits } = require("discord.js");
const {calculateTimeRemaining} = require("./timeUtils");

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

    const collectionNames = ["ITNS_LAB", "ITDSL"]; // Add more collection names as needed

    collectionNames.forEach(async (collectionName) => {
      const collection = db.collection(collectionName);
      const changeStream = collection.watch();

      changeStream.on("change", async (change) => {
        console.log(`Change event on collection ${collectionName}:`, change);
        if (change.operationType === "update") {
          try {
            await client.login("MTIxNTI0ODAwNjAxNDU3NDU5Mg.Gwpsru.jhUj82MYtXUJPIEu1adsaRY62zMJBFNG0QS62U");
            const channel = await client.channels.fetch(channelId);
            const documentId = change.documentKey._id;
            const updatedDocument = await collection.findOne({ _id: new ObjectId(documentId) });
            const timeRemaining = calculateTimeRemaining(updatedDocument.due_date);

            // Construct the message with updated fields
            let message = `A **${collectionName}** Assignment was updated:\n`;
            message += `Title: ${updatedDocument.title}\n`;
            message += `Due Date: ${updatedDocument.due_date} [${timeRemaining}]`;

            await channel.send(message);
            await client.destroy();
          } catch (error) {
            console.error("Error sending notification:", error);
          }
        }
      });
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = { startDBWatcher };
