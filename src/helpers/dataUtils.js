// helpers/dataUtils.js

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://admin:FwhszxosD5x97RSk@hazikeen.kt06qvo.mongodb.net/";
const mongoClient = new MongoClient(uri);


async function fetchData() {
  try {
    await mongoClient.connect();
    console.log("Connected to the MongoDB server");
    const db = mongoClient.db("classroom");
    const collection = db.collection("ITNS_LAB");
    const data = await collection.find({}).toArray();
    console.log("Assignments Fetched!");
    return data.map((document) => ({
      title: document.title,
      dueDate: document.due_date,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

module.exports = { fetchData};
