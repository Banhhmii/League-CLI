require('dotenv').config();

const RIOT_KEY = process.env.RIOT_API_KEY;
const baseURL = "https://americas.api.riotgames.com/"

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

const getMatchIds = async (puuid) => {
  
  const url = baseURL + `lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=5`;
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
}

const showMatchIds = async() => {
  const puuid = await getPUUID();
  const matchIds = await getMatchIds(puuid);
  console.log(matchIds);
}


showMatchIds();