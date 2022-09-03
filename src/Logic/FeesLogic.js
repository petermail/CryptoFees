import { getCoinExFeesAsync, getCryptoComFeesAsync, getHuobiFeesAsync, getNominexFeesAsync, getPricesAsync } from "./ServerLogic";
import { BNB, ETH, LUNA } from './ConstLogic'

var activeId = 0;
const COINS = ["USDT", "USDC", "DAI", "BTC", ETH, "SOL", "FTM", "AVAX", "MATIC", "DOT", BNB, LUNA, 
    "XLM", "XMR", "CRO", "HT", "SHIB", "DOGE", "SCRT", "MOVR", "GLMR", "NEAR", "AURORA", "EVMOS", "ALGO"]; // "RUNE" add it when it is used on Huobi exchange
    //"UST" removed because unknown value


export const loadFeesAsync = async (onUpdate) => {
    const resHuobi = await loadHuobiDataAsync(COINS);
    if (onUpdate) {
        onUpdate(resHuobi);
    }

    const resCryptoCom = await loadCryptoComDataAsync();
    //console.log(resCoinEx);
    //result.push(...res);
    //return result;
    const res = combineFeeLists(resHuobi, resCryptoCom);

    if (onUpdate){
        onUpdate(res);
        const resCoinEx = await loadCoinExDataAsync();
        const result = mergeCoinExFeeList(res, resCoinEx);
        //console.log(result);
        onUpdate([ ...result ]);

        const resNominex = await loadNominexDataAsync();
        //console.log(resNominex);
        const result2 = mergeNominexFeeList(result, resNominex);
        //console.log(result2);
        onUpdate([ ...result2 ]);
    }
    //const result = mergeCoinExFeeList(res, resCoinEx);
    //return result;
}
const combineFeeLists = (listH, listC) => {
    let result = listH;
    for (let i = 0; i < result.length; ++i) {
        const found = listC.filter(x => x.coin === result[i].coin);
        if (found && found[0]) {
            for (let j = 0; j < found[0].data.length; ++j) {
                const found2 = listH[i].data.filter(x => x.chain === found[0].data[j].chain);
                if (found2 && found2[0]) {
                    for (let k = 0; k < listH[i].data.length; ++k) {
                        if (listH[i].data[k].chain === found[0].data[j].chain) {
                            listH[i].data[k].feeCrypto = found[0].data[j].feeCrypto;
                            break;
                        }
                    }
                } else {
                    const newItem = found[0].data[j];
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
const mergeCoinExFeeList = (list, listCo) => {
    for (let i = 0; i < list.length; ++i) {
        const found = listCo.filter(x => x.coin === list[i].coin);
        if (found && found[0] && found[0].data) {
            for (let j = 0; j < list[i].data.length; ++j) {
                const found2 = found[0].data.filter(x => x.chain === list[i].data[j].chain);
                if (found2 && found2[0]) {
                    list[i].data[j].feeCoinEx = found2[0].feeCoinEx;
                }
            }
        }
    }
    return list;
}
const mergeNominexFeeList = (list, listNo) => {
    for (let i = 0; i < list.length; ++i) {
        const found = listNo.filter(x => x.coin === list[i].coin);
        if (found && found[0] && found[0].data) {
            for (let j = 0; j < list[i].data.length; ++j) {
                const found2 = found[0].data.filter(x => x.chain === list[i].data[j].chain);
                if (found2 && found2[0]) {
                    list[i].data[j].feeNominex = found2[0].feeNominex;
                }
            }
        }
    }
    return list;
}

export const loadPricesAsync = async () => {
    const data = await getPricesAsync();
    const mergedData = { ...data.data[0], ...data.data[1] };
    //console.log("prices:");
    //console.log(mergedData);
    const result = [{coin: "USDT", price: 1.0}, {coin: "USDC", price: 1.0}, {coin: "DAI", price: 1.0}];
    result.push(...convertServerPrices(mergedData));

    return result;
}

export const loadCryptoComDataAsync = async () => {
    const res = await getCryptoComFeesAsync();
    //console.log(res.data[0].data.symbols);
    return convertServerCryptoCom(res.data[0].data.symbols);
}

export const loadCoinExDataAsync = async () => {
    const res = await getCoinExFeesAsync();
    return convertServerCoinEx(res.data[0].data.config);
}

export const loadNominexDataAsync = async () => {
    const res = await getNominexFeesAsync();
    return convertServerNominex(res.data[0]);
}

export const loadHuobiDataAsync = async (coins) => {
    //let url = "https://api.huobi.pro/v2/reference/currencies?currency=" + coin.toLowerCase();
    //const val = await axios.get(url);
    //console.log(val.data);
    let res = await getHuobiFeesAsync(coins);
    //console.log(res);
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
    } else if (name === "CCHAIN" || name === "AVAXCCHAIN") {
        return "AVAXC";
    } else if (name === "BEP20BTCB" || name === "BEP20BNB") {
        return "BEP20";
    } else if (name === "BSC") {
        return "BEP20";
    } else if (name === "BEP20DOT") {
        return "BEP20";
    } else if (name === "ERC20" || name === "ERC20ETH") {
        return "ETH";
    } else if (name === "OPT") {
        return "OP";
    } else if (name === "HECOHT") {
        return "HT";
    }
    return name;
}
const fixCryptoComName = (name) => {
    if (name === "ERC20"){
        return "ETH";
    } else if (name === "AVAXC USDC.e") {
        return "AVAXC";
    }
    return name;
}
const fixCoinExName = (name) => {
    if (name === "ERC20") {
        return "ETH";
    } else if (name === "TRC20") {
        return "TRX";
    } else if (name === "BSC") {
        return "BEP20";
    } else if (name === "MATIC") {
        return "Polygon";
    } else if (name === "AVA_C") {
        return "AVAXC";
    } else if (name === "AVA") {
        return "AVAX";
    }
    return name;
}
const fixNominexName = (name) => {
    if (name === "BSC") {
        return "BEP20";
    } else if (name === "MATIC") {
        return "Polygon";
    } else if (name === "ARBITRUM") {
        return "Arbitrum";
    } else if (name === "OPTIMISM") {
        return "OP";
    }
    return name;
}
const convertServerCoinEx = (data) => {
    const result = [];
    let res = null;
    let activeCoin = null;
    let i = 0;
    for (let key in data) {
        const index = key.indexOf('-');
        const firstPart = index === -1 ? key : key.substring(0, index);
        if (activeCoin !== firstPart){
            if (res) {
                result.push(res);
            }
            res = { id: ++activeId, coin: firstPart, data: [] };
        }
        const chain = fixCoinExName(key.substring(index + 1));
        const fee = parseFloat(data[key].withdraw_tx_fee);
        res.data.push({ id: ++i, chain: chain, feeCoinEx: fee });
        activeCoin = firstPart;
    }
    if (res) { result.push(res); }
    return result;
}
const convertServerNominex = (data) => {
    const result = [];
    for (let i = 0; i < data.length; ++i) {
        const code = data[i].code;
        if (COINS.includes(code)) {
            const res = { id: ++activeId, coin: code, data: [] };
            for (let j = 0; j < data[i].networkList.length; ++j) {
                const chain = fixNominexName(data[i].networkList[j].code);
                res.data.push({ id: j, chain: chain, feeNominex: data[i].networkList[j].withdrawalFee });
            }
            result.push(res);
        }
    }
    return result;
}
const convertServerCryptoCom = (symbols) => {
    const result = [];
    for (let i = 0; i < COINS.length; ++i) {
        const nets = symbols[COINS[i]]?.networks;
        const res = { id: ++activeId, coin: COINS[i], data: [] };
        for (let j = 0; j < nets?.length ?? 0; ++j) {
            const fee = parseFloat(nets[j].withdrawalFees);
            let chain = nets[j].networkDisplayName ?? nets[j].network;
            chain = fixCryptoComName(chain);
            res.data.push({ id: j, chain: chain, feeCrypto: fee });
        }
        result.push(res);
    }
    return result;
}
const convertServerPrices = (prices) => {
    const result = [];
    const pairs = [["stellar", "XLM"], ["terra-luna", "LUNA"], ["bitcoin", "BTC"],
        ["matic-network", "MATIC"], ["polkadot", "DOT"], ["ethereum", "ETH"], 
        ["binancecoin", "BNB"], ["solana", "SOL"], ["avalanche-2", "AVAX"], 
        ["fantom", "FTM"], ["crypto-com-chain", "CRO"], ["monero", "XMR"], 
        ["huobi-token", "HT"], ["shiba-inu", "SHIB"], ["dogecoin", "DOGE"],
        ["secret", "SCRT"], ["moonriver", "MOVR"], ["moonbeam", "GLMR"], 
        ["thorchain", "RUNE"], ["near", "NEAR"], ["aurora-near", "AURORA"],
        ["evmos", "EVMOS"], ["algorand", "ALGO"]];
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