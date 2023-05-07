const { MongoClient, ObjectId } = require("mongodb");

// Connection URL
const url = "mongodb://127.0.0.1:27017";

// Use connect method to connect to the server
async function connect(database) {
  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();
  const db = client.db(database);

  console.log("Connected successfully to server mongodb");
  return db;
}

module.exports = { connect, ObjectId };
