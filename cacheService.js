let summonerCache = new Map();
const checkCache = (key) => {
    if(summonerCache.has(key)){
        console.log('Cache hit for', key);
        return summonerCache.get(key);
    }
    return null;
}
const setCache = (key, stats) => {
    summonerCache.set(key, stats);
}
module.exports = {
    checkCache,
    setCache
}