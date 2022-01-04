import { getCryptoComFeesAsync, getHuobiFeesAsync, getPricesAsync } from "./ServerLogic";

var activeId = 0;
const COINS = ["USDT", "USDC", "UST", "DAI", "BTC", "ETH", "SOL", "FTM", "AVAX", "MATIC", "DOT", "BNB", "LUNA", "XLM", "XMR", "CRO", "HT", "SHIB", "DOGE"];


export const loadFeesAsync = async () => {
    let result = await loadHuobiDataAsync(COINS);
    let res = await loadCryptoComDataAsync();
    console.log("Fees:");
    console.log(res);
    //result.push(...res);
    //return result;
    return combineFeeLists(result, res);
}
const combineFeeLists = (listH, listC) => {
    let result = listH;
    for (let i = 0; i < result.length; ++i) {
        let found = listC.filter(x => x.coin === result[i].coin);
        if (found && found[0]) {
            console.log(found[0]);
            for (let j = 0; j < found[0].data.length; ++j) {
                let found2 = listH[i].data.filter(x => x.chain === found[0].data[j].chain);
                if (found2 && found2[0]) {
                    for (let k = 0; k < listH[i].data.length; ++k) {
                        if (listH[i].data[k].chain === found[0].data[j].chain) {
                            listH[i].data[k].feeCrypto = found[0].data[j].feeCrypto;
                            break;
                        }
                    }
                } else {
                    let newItem = found[0].data[j];
                    newItem.id = listH[i].data.length;
                    result[i].data.push(newItem);
                }
            }
        } else {
            result.push(found);
        }
    }
    return result;
}

export const loadPricesAsync = async () => {
    let data = await getPricesAsync();
    //console.log("prices:");
    //console.log(data.data[0]);
    let result = [{coin: "USDT", price: 1.0}, {coin: "USDC", price: 1.0}, {coin: "DAI", price: 1.0}, {coin: "UST", price: 1.0}];
    result.push(...convertServerPrices(data.data[0]));
    return result;
}

export const loadCryptoComDataAsync = async () => {
    let res = await getCryptoComFeesAsync();
    console.log(res.data[0].data.symbols);
    return convertServerCryptoCom(res.data[0].data.symbols);
}

export const loadHuobiDataAsync = async (coins) => {
    //let url = "https://api.huobi.pro/v2/reference/currencies?currency=" + coin.toLowerCase();
    //const val = await axios.get(url);
    //console.log(val.data);
    let res = await getHuobiFeesAsync(coins);
    console.log(res);
    let result = [];
    for (let i = 0; i < res.data.length; ++i) {
        result.push(processHuobiData(res.data[i]));
    }
    return result;
}
const processHuobiData = (data) => {
    let main = data.data[0];
    let result = { id: ++activeId, coin: main.currency.toUpperCase(), data: [] };
    for (let i = 0; i < main.chains.length; ++i) {
        let item = main.chains[i];
        let chain = item.baseChain ?? item.displayName;
        chain = fixHuobiName(chain);
        let fee = parseFloat(item.transactFeeWithdraw);
        result.data.push({ id: i, chain: chain, feeHuobi: fee });
    }
    //console.log(result);
    return result;
}
const fixHuobiName = (name) => {
    if (name === "SOLANA") {
        return "SOL";
    } else if (name === "ARB") {
        return "Arbitrum";
    } else if (name === "MATIC") {
        return "Polygon";
    } else if (name === "TERRA") {
        return "LUNA";
    } else if (name === "CCHAIN") {
        return "AVAXC";
    }
    return name;
}
const fixCryptoComName = (name) => {
    if (name === "ERC20"){
        return "ETH";
    }
    return name;
}
const convertServerCryptoCom = (symbols) => {
    let result = [];
    for (let i = 0; i < COINS.length; ++i) {
        let nets = symbols[COINS[i]]?.networks;
        let res = { id: ++activeId, coin: COINS[i], data: [] };
        for (let j = 0; j < nets?.length ?? 0; ++j) {
            let fee = parseFloat(nets[j].withdrawalFees);
            let chain = nets[j].networkDisplayName ?? nets[j].network;
            chain = fixCryptoComName(chain);
            res.data.push({ id: j, chain: chain, feeCrypto: fee });
        }
        result.push(res);
    }
    return result;
}
const convertServerPrices = (prices) => {
    let result = [];
    let pairs = [["stellar", "XLM"], ["terra-luna", "LUNA"], ["bitcoin", "BTC"],
        ["matic-network", "MATIC"], ["polkadot", "DOT"], ["ethereum", "ETH"], 
        ["binancecoin", "BNB"], ["solana", "SOL"], ["avalanche-2", "AVAX"], 
        ["fantom", "FTM"], ["crypto-com-chain", "CRO"], ["monero", "XMR"], 
        ["huobi-token", "HT"], ["shiba-inu", "SHIB"], ["dogecoin", "DOGE"]];
    for (let i = 0; i < pairs.length; ++i) {
        convertCoinPrivate(prices[pairs[i][0]], pairs[i][1], result);
    }
    return result;
}
const convertCoinPrivate = (c, coin, res) => {
    if (c) {
        res.push(makeCoin(coin, c.usd));
    }
}
const makeCoin = (coin, price) => {
    return { coin: coin, price: price };
}