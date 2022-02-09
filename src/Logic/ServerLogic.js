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

export const getHuobiCoins = (coins) => {
    let result = [];
    for (let i = 0; i < coins.length; ++i) {
        result.push(getHuobiOneCoin(coins[i]));
    }
    console.log(result);
    return result;
}
export const getHuobiOneCoin = (coin) => {
    return "huobi" + coin[0].toUpperCase() + coin.substring(1).toLowerCase();
}
