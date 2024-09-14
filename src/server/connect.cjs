const { MongoClient } = require('mongodb');
require('dotenv').config({ path: "./config.env" });

async function getCollections() {
  const Db = process.env.ATLAS_URI;
  const client = new MongoClient(Db);

  try {
    await client.connect();
    console.log('Connected to MongoDB'); // Debugging statement

    const collections = await client.db("LeagueOfLegends").collections();
    console.log('Fetched collections:', collections); // Debugging statement

    return collections;
  } catch (error) {
    console.error('Error in getCollections:', error); // Handle errors
  } finally {
    await client.close();
    console.log('MongoDB connection closed'); // Debugging statement
  }
}

module.exports = { getCollections };