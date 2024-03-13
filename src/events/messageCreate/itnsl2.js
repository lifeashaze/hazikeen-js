const { EmbedBuilder } = require("discord.js");
const { MongoClient } = require("mongodb");
const uri ="mongodb+srv://admin:FwhszxosD5x97RSk@hazikeen.kt06qvo.mongodb.net/";
const mongoClient = new MongoClient(uri);
let assignments = [];

async function fetchData() {
  try {
    await mongoClient.connect();
    console.log("Connected to the MongoDB server");
    const db = mongoClient.db("classroom");
    const collection = db.collection("ITNS_LAB");
    const data = await collection.find({}).toArray();
    assignments = [];
    data.forEach((document) => {
      const assignment = {
        title: document.title,
        dueDate: document.due_date,
      };
      assignments.push(assignment);
    });
    console.log("Assignments Fetched!");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function sendNotification(client, channelID, messageContent) {
  try {
    const channel = await client.channels.fetch(channelID);
    await channel.send(messageContent);
    console.log("Notification sent to channel:", channelID);
  } catch (error) {
    console.error("Error sending notification:", error);
  }
}

module.exports = async (message, client) => {

  if (message.content === "=itnsl2") {
    await fetchData();
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("IT Network Security Lab Assignments");

    try {
      assignments.forEach((assignment) => {
        embed.addFields({
          name: `${assignment.title}`,
          value: `${assignment.dueDate}`,
        });
      });

      message.channel.send({ embeds: [embed] });
    } catch (error) {
      console.error("Error fetching data:", error);
      message.channel.send("Error fetching assignments.");
    }
  }
};

// Listen for changes in the database using change streams
mongoClient.connect().then(async () => {
  console.log("Connected to the MongoDB server");
  const db = mongoClient.db("classroom");
  const collection = db.collection("ITNS_LAB");
  const changeStream = collection.watch();

  changeStream.on("change", async (change) => {
    console.log("Change event:", change);
    if (change.operationType === "insert" || change.operationType === "update") {
      // If there's an insert or update, fetch the latest data and send a notification
      await fetchData();
      const notificationMessage = "Assignment data has been updated. Check =itnsl for the latest assignments.";
      // Replace 'channelID' with the ID of the channel where you want to send the notification
      console.log("ITNSL Updated!")
    }
  });
});
