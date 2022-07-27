import { getDataAsync, getServerDataAsync, getServerDataPostAsync } from './ServerLogic'
import { FTM, USDC, USDT, ETH, BTC, BNB, MATIC, HT, AVAX, MOVR, CRO, AURORA, GLMR, SOL, UST, Wormhole, Axelar, LUNA, ALGO, TRX, USDD, NEAR, USN } from './ConstLogic'

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const getCurveAsync = async () => {
    const data = await getServerDataAsync(["curveEth"]);
    //console.log(data);
    return createCurve(data.data[0]);
}
export const getCurveFactoryAsync = async () => {
    const data = await getServerDataAsync(["curveEthFactory", "curveFtmFactory"]);
    return [createCurve(data.data[0]), createCurve(data.data[1])];
}
export const getTronAsync = async () => {
    const data = await getServerDataAsync(["tron3pool"]);
    return createTron(data.data[0]);
}
export const getAlgoFiAsync = async () => {
    const data = await getServerDataAsync(["algoCoins"]);
    //console.log(data);
    return algoFiData(data.data[0]);
}

export const getUsdAsync = async (onUpdate) => {
    let res = [];
    const serverDataFull = [
        ["etherscanUsdc", "polygonscanUsdc", "bscscanUsdc", 
        "avaxUsdc", "ftmUsdc"], 
        ["empty", "empty", "empty", "empty", "empty", 
        "movrUsdc", "etherscanUsdt", "polygonscanUsdt", "bscscanUsdt", "avaxUsdt"], 
        ["empty", "empty", "empty", "empty", "empty", 
        "empty", "empty", "empty", "empty", "empty", 
        "ftmUsdt", "movrUsdt", "croUsdt", "croUsdc", "auroraUsdt"], 
        ["empty", "empty", "empty", "empty", "empty", 
        "empty", "empty", "empty", "empty", "empty", 
        "empty", "empty", "empty", "empty", "empty", 
        "auroraUsdc", "glmrUsdt", "glmrUsdc", "etherscanUst", "avaxUstWormhole"], 
        ["empty", "empty", "empty", "empty", "empty", 
        "empty", "empty", "empty", "empty", "empty", 
        "empty", "empty", "empty", "empty", "empty", 
        "empty", "empty", "empty", "empty", "empty", 
        "avaxUstAxelar", "bscscanUst", "ftmUst", "hecoinfoUsdc", "hecoinfoUsdt"], 
        ["empty", "empty", "empty", "empty", "empty", 
        "empty", "empty", "empty", "empty", "empty", 
        "empty", "empty", "empty", "empty", "empty", 
        "empty", "empty", "empty", "empty", "empty", 
        "empty", "empty", "empty", "empty", "empty", 
        "arbiscanUsdc", "arbiscanUsdt", "optimismUsdc", "optimismUsdt"],
    ]; // "terraUst"
        
    const dataPost = await getServerDataPostAsync(["nearUsdc", "nearUsdt", "nearUsn"]);
    //console.log(processDataNear(dataPost.data[0], 6));
    const data2 = await getServerDataAsync(["tronscanUsdc", "tronscanUsdt", "tronscanUsdd"]);
    //console.log(data2.data);
    let dataAlgoUsdc = null;
    let dataAlgoUsdt = null; 
    let dataSolUsdt = null;
    let dataSolUsdc = null;
    let dataSolUst = null;
    try {
        dataAlgoUsdc = await getDataAsync("https://indexer.algoexplorerapi.io/v2/assets/31566704?include-all=true", 2000);
        dataAlgoUsdt = await getDataAsync("https://indexer.algoexplorerapi.io/v2/assets/312769?include-all=true", 2000);
        dataSolUsdt = await getDataAsync("https://api.solscan.io/account?address=Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB", 2000);
        dataSolUsdc = await getDataAsync("https://api.solscan.io/account?address=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", 2000);
        //dataSolUst = await getDataAsync("https://api.solscan.io/account?address=9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i", 2000);
    } catch {} /* */
    const usdtIndex = 16;
    const usddIndex = usdtIndex + 16;
    const usnIndex = usddIndex + 1;
    const ustIndex = usnIndex + 1;
    for (const serverData of serverDataFull) {
        const data = await getServerDataAsync(serverData);
        res = [
            addData(res, 0, () => createTokenData(ETH, processData(data.data[0]), USDC)),
            addData(res, 1, () => createTokenData(SOL, processDataSol(dataSolUsdc?.data), USDC)),
            addData(res, 2, () => createTokenData(TRX, processDataTron(tronDataFix(data2.data)[0])/1000000, USDC)),
            addData(res, 3, () => createTokenData(BNB, processData(data.data[2])/1000000000000, USDC)),
            addData(res, 4, () => createTokenData(MATIC, processData(data.data[1]), USDC)),
            addData(res, 5, () => createTokenData(CRO, processData(data.data[13]), USDC)),
            addData(res, 6, () => createTokenData("Arbitrum", processData(data.data[25]), USDC)),
            addData(res, 7, () => createTokenData(AVAX, processData(data.data[3]), USDC)),
            addData(res, 8, () => createTokenData(FTM, processData(data.data[4]), USDC)),
            addData(res, 9, () => createTokenData(ALGO, processDataAlgo(dataAlgoUsdc?.data), USDC)),
            addData(res, 10, () => createTokenData("Optimism", processData(data.data[27]), USDC)),
            addData(res, 11, () => createTokenData(NEAR, processDataNear(dataPost.data[0], 6), USDC)),
            addData(res, 12, () => createTokenData(AURORA, processDataAurora(data.data[15]), USDC)),
            addData(res, 13, () => createTokenData(MOVR, processData(data.data[5]), USDC)),
            addData(res, 14, () => createTokenData(GLMR, processData(data.data[17]), USDC)),
            addData(res, 15, () => createTokenData(HT, processData(data.data[23]), USDC)),
            
            addData(res, usdtIndex, () => createTokenData(TRX, processDataTron(tronDataFix(data2.data)[1])/1000000, USDT)),
            addData(res, usdtIndex + 1, () => createTokenData(ETH, processData(data.data[6]), USDT)),
            addData(res, usdtIndex + 2, () => createTokenData(BNB, processData(data.data[8])/1000000000000, USDT)),
            addData(res, usdtIndex + 3, () => createTokenData(SOL, processDataSol(dataSolUsdt?.data), USDT)),
            addData(res, usdtIndex + 4, () => createTokenData(MATIC, processData(data.data[7]), USDT)),
            addData(res, usdtIndex + 5, () => createTokenData(CRO, processData(data.data[12]), USDT)),
            addData(res, usdtIndex + 6, () => createTokenData(HT, processData(data.data[24])/1000000000000, USDT)), // 2 DOWN
            addData(res, usdtIndex + 7, () => createTokenData("Arbitrum", processData(data.data[26]), USDT)),
            addData(res, usdtIndex + 8, () => createTokenData(ALGO, processDataAlgo(dataAlgoUsdt?.data), USDT)), // 2 UP
            addData(res, usdtIndex + 9, () => createTokenData(NEAR, processDataNear(dataPost.data[1], 6), USDT)),
            addData(res, usdtIndex + 10, () => createTokenData(AVAX, processData(data.data[9]), USDT)), // 1 DOWN, 
            addData(res, usdtIndex + 11, () => createTokenData(FTM, processData(data.data[10]), USDT)),
            addData(res, usdtIndex + 12, () => createTokenData(AURORA, processDataAurora(data.data[14]), USDT)),
            addData(res, usdtIndex + 13, () => createTokenData("Optimism", processData(data.data[28]), USDT)),
            addData(res, usdtIndex + 14, () => createTokenData(MOVR, processData(data.data[11]), USDT)),
            addData(res, usdtIndex + 15, () => createTokenData(GLMR, processData(data.data[16]), USDT)),

            addData(res, usddIndex, () => createTokenData(TRX, processDataTron(tronDataFix(data2.data)[2])/1000000000000000000, USDD)),

            addData(res, usnIndex, () => createTokenData(NEAR, processDataNear(dataPost.data[2], 18), USN)),

            //addData(res, 0, () => createTokenData(LUNA, processDataLuna(data.data[27]), UST)),
            /*addData(res, ustIndex, () => createTokenData(ETH, processData(data.data[18])/1000000000000, UST)),
            addData(res, ustIndex + 1, () => createTokenData(BNB, processData(data.data[21])/1000000000000, UST)),
            addData(res, ustIndex + 2, () => createTokenData(AVAX, processData(data.data[19]), UST, Wormhole)),
            addData(res, ustIndex + 3, () => createTokenData(AVAX, processData(data.data[20]), UST, Axelar)),
            addData(res, ustIndex + 4, () => createTokenData(FTM, processData(data.data[22]), UST, Wormhole)),
            addData(res, ustIndex + 5, () => createTokenData(SOL, processDataSol(dataSolUst?.data), UST, Wormhole)),*/
            
        ];
        if (onUpdate) {
            onUpdate([...res]);
        }
    }
}
const addData = (res, index, processed) => {
    return (index < res.length && res[index].amount) ? res[index] : processed();
}

const ETH_CURVE_3POOL_ADDRESS = "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7";
const ETH_CURVE_USDD_POOL_ADDRESS = "0xe6b5CC1B4b47305c58392CE3D359B10282FC36Ea";
const FTM_CURVE_TOR_POOL_ADDRESS = "0x24699312CB27C26Cfc669459D670559E5E44EE60";
const createCurve = (data) => {
    const result = [];
    for (const item of data.data.poolData) {
        if ([ETH_CURVE_3POOL_ADDRESS, ETH_CURVE_USDD_POOL_ADDRESS, FTM_CURVE_TOR_POOL_ADDRESS]
                .includes(item.address)) {
            let sum = 0;
            for (const coin of item.coins) {
                //console.log(coin);
                result.push(curveItem(coin.symbol, coin.poolBalance, coin.decimals));
                sum += result[result.length - 1].amount;
            }
            for (const res of result) {
                res.perc = res.amount / sum;
            }
        }
    }
    return result;
}
const curveItem = (name, amount, decimals) => {
    const val = amount / Math.pow(10, decimals);
    return { amount: val, name: modifyCurveName(name) };
}
const modifyCurveName = (name) => {
    switch (name) {
        case "DAI+USDC": return "DAI-USDC";
        default: return name;
    }
}

const createTron = (data) => {
    const result = [];
    let sum = 0;
    for (const item of data.withPriceTokens) {
        if (["USDD", "TUSD", "USDT"].includes(item.tokenAbbr)) {
            result.push(curveItem(item.tokenAbbr, item.balance, item.tokenDecimal));
            sum += result[result.length - 1].amount;
        }
    }
    for (const res of result) {
        res.perc = res.amount / sum;
    }
    return result;
}
const tronItem = (name, amount, decimals) => {
    const val = parseInt(amount.substring(0, amount.length - decimals));
    return { amount: val, name: name };
}

const createTokenData = (network, amount, coin, bridge) => {
    return { network: network, amount: amount, coin: coin, bridge: bridge };
}
const processData = (data) => {
    if (!data) { return undefined; }
    return parseInt(data.result) / 1000000;
}
const processDataAurora = (data) => {
    if (!data) { return undefined; }
    return data.result ? parseInt(data.result.totalSupply) / Math.pow(10, parseInt(data.result.decimals)) : 0;
}
const processDataSol = (data) => {
    if (!data) { return undefined; }
    return parseInt(data.data.tokenInfo.supply) / 1000000;
}
const processDataTron = (data) => {
    if (!data) { return undefined; }
    return data.trc20_tokens ? parseInt(data.trc20_tokens[0].total_supply_with_decimals) : 0;
}
const processDataLuna = (data) => {
    if (!data) { return undefined; }
    return data.uusd ? parseInt(data.uusd[0].total) / 1000000 : 0;
}
const processDataAlgo = (data) => {
    if (!data) { return undefined; }
    return parseInt(data.asset.params["circulating-supply"] / 1000000);
}
const processDataNear = (data, decimals) => {
    if (!data) { return undefined; }
    const amountText = stringFromArray(data.result.result);
    return parseInt(amountText.substring(1, amountText.length - decimals - 1)); // 1 to ignore: \" at end and start
}

const tronDataFix = (data) => {
    if (!data) { return undefined; }
    let result = data;
    let index = 1;
    while (index > 0) {
        index = result.indexOf(',"social_media_list"');
        if (index === -1) { break; }
        let count = 0;
        for (let i = index; i < result.length; ++i) {
            if (result[i] === ']') {
                --count;
                if (count === 0) {
                    const res = result.substring(0, index) + result.substring(i+1);
                    result = res;
                    break;
                } 
            } else if (result[i] === '[') {
                ++count;
            }
        }
    }
    //console.log(result);
    return result.length > 0 ? JSON.parse(result) : result;
}

const algoFiData = (data) => {
    for (const item of data.asset_snapshots) {
        if (item.name === 'STBL') {
            return item.price;
        }
    }
    return 0;
}

const stringFromArray = (data) =>
  {
    var count = data.length;
    var str = "";
    
    for(var index = 0; index < count; index += 1)
      str += String.fromCharCode(data[index]);
    
    return str;
  }