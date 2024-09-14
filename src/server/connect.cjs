
const { MongoClient } = require('mongodb');

// Require dotenv to access the environment variables
require('dotenv').config({ path: "./config.env" });

async function getCollections() {
  const Db = process.env.ATLAS_URI;

  const client = new MongoClient(Db);

  try {
    await client.connect();

    const collections = await client.db("LeagueOfLegends").collections();

    return collections;
  } catch (error) {
    console.error(error); // Handle errors
  } finally {
    await client.close();
  }
}
module.exports = getCollections; // Export the function itself
