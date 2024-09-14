// This is the connection file that connects to the MongoDB Atlas cluster using the MongoDB Node.js driver.
// const  { MongoClient } = require('mongodb');

// const uri = "mongodb+srv://patrickvyn:8ap2OMgOmJ2z8d4U@cluster0.z30i1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// /*
// Now that  we  have pinged the server we want to get the data from the database.
// We will create a function that will return the data from the database.
// */
// async function getPlayers() {
//   try {
//     await client.connect();
//     const database = client.db("LeagueOfLegends");
//     const players = database.collection("players");
//     return await players.find({}).toArray();
//   } finally {
//     await client.close();
//   }
// }

// getPlayers().then(console.log).catch(console.error);

// /*
//   Put this code  into a react text component and you will see the data from the database.
// */
// function connection() {
//   return (
//     <div>
//       {getPlayers().then(console.log).catch(console.error)}
//     </div>
//   );
// }

// export default connection;