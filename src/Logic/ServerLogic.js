import axios from "axios"

export const getServerDataAsync = async (names) => {
    return await axios.post("https://fullbridge.wz.cz/CryptoFees/resend.php", { names: names });
}

export const getCryptoComFeesAsync = async () => {
    return await getServerDataAsync(["cryptoCom"]);
}
export const getHuobiFeesAsync = async (coins) => {
    return await getServerDataAsync(getHuobiCoins(coins));
}
export const getPricesAsync = async () => {
    return await getServerDataAsync(["price"]);
}
export const getGasAsync = async () => {
    return await getServerDataAsync(["etherscanGas", "polygonscanGas", "bscscanGas", "lunaGas", 
        "avaxGas", "ftmGas", "moonriverGas", "xmrGas"]);
}

export const getCurrentInflationAsync = async () => {
    return await getServerDataAsync(["inflation"]);
}
export const getInflationAsync = async () => {
    return await axios.get("https://fullbridge.wz.cz/CryptoFees/select.php?table=inflation&columns=timestamp,data&where=id%20%3E%201%20ORDER%20BY%20id%20DESC%20LIMIT%201");
}

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
