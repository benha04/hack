/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('LeagueOfLegends');

// Insert a few documents into the players collection.
db.getCollection('players').insertMany([
  { 'SummonerName': 'legend_27',  'Kills': 10, 'Deaths': 2, 'Assists': 5, 'VisionScore': 20, 'GoldEarned': 15000 },
    { 'SummonerName': 'noobmaster69', 'Kills': 2, 'Deaths': 10, 'Assists': 5, 'VisionScore': 10, 'GoldEarned': 5000 },
    { 'SummonerName': 'proplayer', 'Kills': 20, 'Deaths': 0, 'Assists': 10, 'VisionScore': 30, 'GoldEarned': 20000 },

]);


// Run a find command to view how many players have 10 kills or more.
const playersWith10KillsOrMore = db.getCollection('players').find({
  Kills: { $gte: 10 }
}).count();


// Print a message to the output window.
console.log(`${playersWith10KillsOrMore} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('players').aggregate([
  // Find all players  with  more than 10 kills.
    {
        $match: {
        Kills: { $gte: 10 }
        }
    },
  
  //Group the players by the number of kills.
    {
        $group: {
            _id: '$Kills',
            count: { $sum: 1 }
        }
    },
  
]);
