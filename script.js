async function getStats(event) {
    event.preventDefault();
    const summonerName = document.getElementById('summonerName').value;
    const tagLine = document.getElementById('tagLine').value;
    let resultsDiv = document.getElementById('results');
    let resultString;

    try {
        const response = await fetch(`/api?summonerName=${summonerName}&tagLine=${tagLine}`);
        if (response.status === 404) {
            resultsDiv.innerHTML = '<p>Summoner not found</p>';
            return;

        }
        else if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
         resultsDiv = document.getElementById('results');
         resultString = data.matchStats.map(match => {
            return `
                <div class="match-card">
                    <img src="https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/${match.champion}.png" alt="${match.champion}">
                    <p>KDA: ${match.kills}/${match.deaths}/${match.assists}</p>
                    <p>Result: ${match.win ? "Win" : "Lose"}</p>
                </div>
            `
        }).join("")
        resultsDiv.innerHTML = resultString;
        document.getElementById('search-form').reset();
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
}

 document.getElementById('search-form').addEventListener('submit', getStats);