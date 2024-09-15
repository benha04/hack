// const { MongoClient } = require('mongodb');
// require('dotenv').config({ path: "./config.env" });


// const uri = "mongodb+srv://patrickvyn:8ap2OMgOmJ2z8d4U@cluster0.z30i1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Ensure this is defined
// const client = new MongoClient(uri);

// async function collections() {
//   // const Db = process.env.ATLAS_URI;
//   // const client = new MongoClient(Db);

//   try {
//     await client.connect();
//     const database = await client.db("LeagueOfLegends");
//     console.log('Fetched database:', database); // Debugging statement

//     const collectionsCursor = await database.listCollections().toArray();
//     const collectionNames = collectionsCursor.map(collection => collection.name);
//     console.log('Fetched collections:', collectionNames); // Debugging statement

//     return collectionNames;
//   } catch (error) {
//     console.error('Error in getCollections:', error); // Handle errors
//   } finally {
//     await client.close();
//     console.log('MongoDB connection closed'); // Debugging statement
//   }
// }

export function add (num1, num2){
  return num1 + num2;
}

export default add;
