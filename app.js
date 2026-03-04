const RIOT_KEY = process.env.RIOT_API_KEY;

async function getPUUID() {
  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/Bánh/2436`;
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
    console.log(result.puuid);
    return result.puuid;
  } catch (error) {
    console.error("Error fetching PUUID:", error);
  }
}

getPUUID();
