from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import requests
import json

#API stuff
#####################################################################################################
uri = "mongodb+srv://zehan:q2w1e4r3t6y5@cluster0.z30i1.mongodb.net/?retryWrites=true&w=majority"

api_key = "?api_key=RGAPI-d02ad7c4-fb12-4fd2-838e-124917b0da14"
match_id = "5108988079"
get_match_url = "https://americas.api.riotgames.com/lol/match/v5/matches/NA1_"
get_account_url = "https://americas.api.riotgames.com/riot/account/v1/accounts/by-puuid/"

#####################################################################################################

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))


db = client["LeagueOfLegends"]

players = db["players"]
games = db["Games"]

leaderboard = db["leaderboard"]



playerData = []

matchIDs = []






def enterMatchData():
    """
    gets all the matchids and then adds to match id list
    and then call parsePLayerData for each match
    """
    document = games.find_one({"hi": "hello"})

    gameIDs = document['idk']

    for gameID in gameIDs:
        matchIDs.append(gameID)
        parsePlayerData(gameID)

########################################################################

def parsePlayerData(match_id):
    playerIDs = []
    # Get match JSON
    resp = requests.get(get_match_url + match_id + api_key)
    match = resp.json()




    
    # Loop through the participants and create a dictionary with an empty list as value
    for playerid in match['metadata']['participants']:
        playerIDs.append(playerid)
    
    # Go into info and gather stats (example)
    i = 0
    for participant in match['info']['participants']:
        playerid = playerIDs[i]
        summoner_name = participant['summonerName']
        kills = participant['kills']
        deaths = participant['deaths']
        assists = participant['assists']
        vision_score = participant['visionScore']
        gold_earned = participant['goldEarned']
        i += 1


        #instead of this we loop through player data array until we find the same playerid
        #then we increment the values in that dictionary
        foundPlayer = False
        for player in playerData:
            if player['playerid'] == playerid:
                foundPlayer = True
                player['summoner_name'] = summoner_name
                player['kills'] += kills
                player['deaths'] += deaths
                player['assists'] += assists
                player['vision_score'] += vision_score
                player['gold_earned'] += gold_earned
        
        if not foundPlayer:
            playerData.append({
                'summoner_name' : summoner_name,
                'playerid': playerid,
                'kills': kills,
                'deaths': deaths,
                'assists': assists,
                'vision_score': vision_score,
                'gold_earned': gold_earned
            })


def calculateKDA():
    """"
    loop through playerdata
    calculate kda for each player and then add to the hashmap
    """
    for player in playerData:
        kills = player['kills']
        deaths = player['deaths']
        assists = player['assists']
        
        player['kda'] = (kills+assists)/deaths if deaths != 0 else kills + assists



def updatePlayer():
    """
    use upsert and if it has the data we just replace the values
    if not then it creates a new playerid area
    
    """
    for player in playerData:
        playerID = player['playerid']  # Changed from playerData to player
        players.update_one(
            {"PlayerID": playerID},  # Filter by PlayerID
            {"$set": {  # Use $set operator to update or set fields
                "summoner_name": player['summoner_name'],
                "kills": player['kills'],
                "deaths": player['deaths'],
                "assists": player['assists'],
                "vision_score": player['vision_score'],
                "gold_earned": player['gold_earned']
            }},
            upsert=True  # If PlayerID doesn't exist, create a new document
        )



def updateLeaderBoard():
    """
    Update leaderboard for top 6 players in each category:
    most kills, deaths, assists, kda, gold earned, and vision score
    Creating separate documents for each category with ranked players
    """

    categories = {
        'mostKills': 'kills',
        'mostDeaths': 'deaths',
        'mostAssists': 'assists',
        'mostGold': 'gold_earned',
        'highestKDA': 'kda',
        'mostVisionScore': 'vision_score'
    }

    for category_name, player_key in categories.items():
        # Sort players by the current category in descending order
        sorted_players = sorted(playerData, key=lambda x: x[player_key], reverse=True)
        
        # Get the top 6 players for this category
        top_6 = sorted_players[:6]

        # Create a dictionary for the category document
        category_document = {
            'category': category_name
        }

        numbers = ["one", "two", "three", "four", "five", "six"]
        # Add ranked players to the document
        for idx, player in enumerate(top_6, 0):
            
            category_document[numbers[idx]] = player["summoner_name"]

        # Update or insert the category document
        leaderboard.update_one(
            {'category': category_name},
            {'$set': category_document},
            upsert=True
        )




enterMatchData()
calculateKDA()
updatePlayer()
updateLeaderBoard()