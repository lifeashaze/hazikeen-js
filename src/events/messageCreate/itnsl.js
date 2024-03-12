const { EmbedBuilder } = require("discord.js");
const { MongoClient } = require("mongodb");
const uri ="mongodb+srv://admin:FwhszxosD5x97RSk@hazikeen.kt06qvo.mongodb.net/";
const mongoClient = new MongoClient(uri);
let assignments = [];

async function fetchData(){
  try {
    await mongoClient.connect();
      console.log("Connected to the MongoDB server");
      const db = mongoClient.db("classroom");
      const collection = db.collection("ITNS_LAB");
      const data = await collection.find({}).toArray();
      assignments = []
      
    
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


module.exports = async (message, client) => {

  if (message.content === "=itnsl") {
    await fetchData()
    const embed = new EmbedBuilder()
      .setColor("#0099ff")
      .setTitle("IT Network Security Lab Assignments")

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
