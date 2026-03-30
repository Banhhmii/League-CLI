
async function getStats() {
    const summonerName = document.getElementById('summonerName').value;
    const tagLine = document.getElementById('tagLine').value;

    try {
        const response = await fetch(`http://localhost:3000/api?summonerName=${summonerName}&tagLine=${tagLine}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const resultsDiv = document.getElementById('results');
         const formatString = data.matchStats.map(match => {
            return `
                <div class="match-card">
                    <h2>${match.champion}</h2>
                    <p>KDA: ${match.kills}/${match.deaths}/${match.assists}</p>
                    <p>Result: ${match.win ? "Win" : "Lose"}</p>
                </div>
            `
        }).join("")
        resultsDiv.innerHTML = formatString;
    } catch (error) {
        console.error('Error fetching stats:', error);
    }

}

