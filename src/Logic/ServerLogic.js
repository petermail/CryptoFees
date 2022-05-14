import axios from "axios"

export const getServerDataAsync = async (names) => {
    return await axios.post("https://fullbridge.wz.cz/CryptoFees/resend.php", { names: names });
}

export const getCoinExFeesAsync = async () => {
    return await getServerDataAsync(["coinex"]);
}
export const getCryptoComFeesAsync = async () => {
    return await getServerDataAsync(["cryptoCom"]);
}
export const getHuobiFeesAsync = async (coins) => {
    return await getServerDataAsync(getHuobiCoins(coins));
}
export const getPricesAsync = async () => {
    return await getServerDataAsync(["price", "price2"]);
}
export const getGasAsync = async () => {
    return await getServerDataAsync(["etherscanGas", "polygonscanGas", "bscscanGas", "lunaGas", 
        "avaxGas", "ftmGas", "moonriverGas", "xmrGas", "hecoinfoGas", "croGas", "arbGas"]);
}

export const getCurrentInflationAsync = async () => {
    return await getServerDataAsync(["inflation", "inflation2"]);
}
export const getInflationAsync = async () => {
    return await axios.get("https://fullbridge.wz.cz/CryptoFees/select.php?table=inflation&columns=timestamp,data&where=id%20%3E%201%20AND%20name%3D%27inflation%27%20ORDER%20BY%20id%20DESC%20LIMIT%201");
}
export const getInflation2Async = async () => {
    return await axios.get("https://fullbridge.wz.cz/CryptoFees/select.php?table=inflation&columns=timestamp,data&where=id%20%3E%201%20AND%20name%3D%27inflation2%27%20ORDER%20BY%20id%20DESC%20LIMIT%201");
}
// Deocode url here: https://www.urldecoder.io/

export const getHuobiCoins = (coins) => {
    let result = [];
    for (let i = 0; i < coins.length; ++i) {
        result.push(getHuobiOneCoin(coins[i]));
    }
    return result;
}
export const getHuobiOneCoin = (coin) => {
    return "huobi" + coin[0].toUpperCase() + coin.substring(1).toLowerCase();
}

export const getDataAsync = async (url) => {
    return await axios.get(url);
}