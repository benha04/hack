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

#####################################################################################################

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))


db = client["LeagueOfLegends"]

players = db["players"]
games = db["Games"]




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
                player['kills'] += kills
                player['deaths'] += deaths
                player['assists'] += assists
                player['vision_score'] += vision_score
                player['gold_earned'] += gold_earned
        
        if not foundPlayer:
            playerData.append({
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

    return None


def updatePlayer():
    """
    use upsert and if it has the data we just replace the values
    if not then it creates a new playerid area
    
    """

    return None


def updateLeaderBoard():
    """
    update leaderboard
    for most kills, deaths, assists, kda, gold earned
    
    """


    return None