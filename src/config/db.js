const { MongoClient } = require("mongodb");

let DB;

const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGO_URI);

    await client.connect();

    DB = client.db(process.env.DB_NAME);

    console.log("DB Connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

const getDB = () => DB;

module.exports = { connectDB, getDB };