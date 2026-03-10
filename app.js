require("dotenv").config();

const RIOT_KEY = process.env.RIOT_API_KEY;
const baseURL = "https://americas.api.riotgames.com/";

//Takes summoner name and tag line as arguements from the terminal and returns the PUUID
async function getPUUID() {
  const args = process.argv.slice(2);
  const summonerName = args[0];
  const tagLine = args[1];
  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${summonerName}/${tagLine}`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": RIOT_KEY,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result.puuid;
  } catch (error) {
    console.error("Error fetching PUUID:", error);
  }
}

//Uses PUUID to get the most recent 5 match IDS of the player and returned as an object
const getMatchIds = async (puuid) => {
  const url =
    baseURL + `lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": RIOT_KEY,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching match IDs:", error);
  }
};

//Takes a match ID and returns the details of the match as an object
const getMatchDetails = async (matchId) => {
  const url = baseURL + `lol/match/v5/matches/${matchId}`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-Riot-Token": RIOT_KEY,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching match details:", error);
  }
};
//Takes the match details and the player's PUUID and returns the player's stats for that match as an object
const getPlayerStats = (matchDetails, puuid) => {
  const participant = matchDetails.info.participants.find(
    (player) => player.puuid === puuid,
  );
  if (participant) {
    return {
      kills: participant.kills,
      deaths: participant.deaths,
      assists: participant.assists,
      championName: participant.championName,
      win: participant.win,
    };
  } else {
    console.error("Player not found in match details.");
    return null;
  }
};
const showMatchIds = async () => {
  const puuid = await getPUUID();
  const matchIds = await getMatchIds(puuid);
  for (let matchId of matchIds) {
    let matchDetails = await getMatchDetails(matchId);
    let playerStats = await getPlayerStats(matchDetails, puuid);
    console.log(
      `Champion: ${playerStats.championName}, K/D/A: ${playerStats.kills}/${playerStats.deaths}/${playerStats.assists}, Win: ${playerStats.win ? "Yes" : "No"}`,
    );
  }
};

showMatchIds();
