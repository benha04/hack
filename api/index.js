import express, { response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userModel from './models/users.js';
import { MongoClient } from 'mongodb';
import { error } from 'console';

const app = express();
app.use(cors());
app.use(express.json());

var CONNECTION_URL = "mongodb+srv://patrickvyn:8ap2OMgOmJ2z8d4U@cluster0.z30i1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASENAME = "LeagueOfLegends";
var database;



// Establish MongoDB connection
mongoose.connect(CONNECTION_URL)
  .then(() => {
    console.log("MongoDB Connection Success!");
    database = mongoose.connection.useDb(DATABASENAME);
    console.log(`Connected to database: ${DATABASENAME}`);
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Wait for the MongoDB connection to be established before defining routes
mongoose.connection.once('open', () => {
  console.log('MongoDB connection is open');
  
  // Start the server
  app.listen(3001, () => {
    console.log('Server is running on port 3001');
  });

  // ------Getters------
  app.get('/api/LeagueOfLegends/users', async (req, res) => {
    userModel.find()
      .then(users => res.json(users))
      .catch(err => res.json(err)); 
  });

  //Getting the  database collections
  app.get('/api/LeagueOfLegends/leaderboard', async (req, res) => {
    try {
      const result = await database.collection("leaderboard").find({}).toArray();
      res.send(result);
    } catch (err) {
      console.error('Error fetching collections:', err);
      res.status(500).send('Internal Server Error');
    }
  });



  //Getting the  database players
  app.get('/api/LeagueOfLegends/players', async (req, res) => {
    try {
      const result = await database.collection("players").find({}).toArray();
      res.send(result);
    } catch (err) {
      console.error('Error fetching collections:', err);
      res.status(500).send('Internal Server Error');
    }
  });
    

  // // ------Posts------
  // app.post('/api/LeagueOfLegends/add', async (req, res) => {
  //   database.collection("players").count({}, function(err, numOfDocs){
  //     database.collection("players").insertOne({
  //       id: (numOfDocs + 1).toString(),
  //       description: req.body.description,
  //     });
  //     response.json("Added Successfully");
  //   });
  // });

  // //----Deletes-----
  // app.delete('/api/LeagueOfLegends/delete/:id', async (req, res) => {
  //   database.collection("players").deleteOne({
  //     id: req.params.id
  //   });
  //   res.json("Deleted Successfully");
  // });




  
});
