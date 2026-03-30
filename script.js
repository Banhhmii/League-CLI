
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
        resultsDiv.innerHTML = `<pre>${JSON.stringify(data.matchStats, null, 2)}</pre>`;
    } catch (error) {
        console.error('Error fetching stats:', error);
    }

}

