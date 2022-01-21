import axios from "axios"

export const getServerFeesAsync = async (names) => {
    return await axios.post("https://fullbridge.wz.cz/CryptoFees/resend.php", { names: names });
}

export const getCryptoComFeesAsync = async () => {
    return await getServerFeesAsync(["cryptoCom"]);
}
export const getHuobiFeesAsync = async (coins) => {
    return await getServerFeesAsync(getHuobiCoins(coins));
}
export const getPricesAsync = async () => {
    return await getServerFeesAsync(["price"]);
}
export const getGasAsync = async () => {
    return await getServerFeesAsync(["etherscanGas", "polygonscanGas", "bscscanGas", "lunaGas", 
        "avaxGas", "ftmGas", "moonriverGas"]);
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
