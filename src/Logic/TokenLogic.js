import { getDataAsync, getServerDataAsync } from './ServerLogic'
import { FTM, USDC, USDT, ETH, BTC, BNB, MATIC, HT, AVAX, MOVR, CRO, AURORA, GLMR, SOL, UST, Wormhole, Axelar, LUNA, ALGO } from './ConstLogic'

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const getCurveAsync = async () => {
    const data = await getServerDataAsync(["curveEth"]);
    //console.log(data);
    return createCurve(data.data[0]);
}

export const getUsdAsync = async () => {
    const data = await getServerDataAsync(["etherscanUsdc", "polygonscanUsdc", "bscscanUsdc", 
        "avaxUsdc", "ftmUsdc", "movrUsdc",
        "etherscanUsdt", "polygonscanUsdt", "bscscanUsdt", 
        "avaxUsdt", "ftmUsdt", "movrUsdt",
        "croUsdt", "croUsdc", "auroraUsdt", "auroraUsdc", "glmrUsdt", "glmrUsdc",
        "etherscanUst", "avaxUstWormhole", "avaxUstAxelar", "bscscanUst",
        "ftmUst", "hecoinfoUsdc", "hecoinfoUsdt", "arbiscanUsdc", "arbiscanUsdt"]); // "terraUst"
    console.log(data);
    const dataAlgoUsdc = await getDataAsync("https://indexer.algoexplorerapi.io/v2/assets/31566704?include-all=true");
    const dataAlgoUsdt = await getDataAsync("https://indexer.algoexplorerapi.io/v2/assets/312769?include-all=true");
    const dataSolUsdt = await getDataAsync("https://public-api.solscan.io/market/token/Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB");
    const dataSolUsdc = await getDataAsync("https://public-api.solscan.io/market/token/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v");
    const dataSolUst = await getDataAsync("https://public-api.solscan.io/market/token/9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i");
    return [
        createTokenData(ETH, processData(data.data[0]), USDC),
        createTokenData(SOL, processDataSol(dataSolUsdc.data), USDC),
        createTokenData(BNB, processData(data.data[2])/1000000000000, USDC),
        createTokenData(MATIC, processData(data.data[1]), USDC),
        createTokenData(AVAX, processData(data.data[3]), USDC),
        createTokenData(FTM, processData(data.data[4]), USDC),
        createTokenData(CRO, processData(data.data[13]), USDC),
        createTokenData(AURORA, processDataAurora(data.data[15]), USDC),
        createTokenData("Arbitrum", processData(data.data[25]), USDC),
        createTokenData(ALGO, processDataAlgo(dataAlgoUsdc.data), USDC),
        createTokenData(MOVR, processData(data.data[5]), USDC),
        createTokenData(GLMR, processData(data.data[17]), USDC),
        createTokenData(HT, processData(data.data[23]), USDC),
        
        createTokenData(ETH, processData(data.data[6]), USDT),
        createTokenData(BNB, processData(data.data[8])/1000000000000, USDT),
        createTokenData(SOL, processDataSol(dataSolUsdt.data), USDT),
        createTokenData(HT, processData(data.data[24])/1000000000000, USDT),
        createTokenData(MATIC, processData(data.data[7]), USDT),
        createTokenData(CRO, processData(data.data[12]), USDT),
        createTokenData(AVAX, processData(data.data[9]), USDT),
        createTokenData(AURORA, processDataAurora(data.data[14]), USDT),
        createTokenData("Arbitrum", processData(data.data[26]), USDT),
        createTokenData(ALGO, processDataAlgo(dataAlgoUsdt.data), USDT),
        createTokenData(FTM, processData(data.data[10]), USDT),
        createTokenData(MOVR, processData(data.data[11]), USDT),
        createTokenData(GLMR, processData(data.data[16]), USDT),

        //createTokenData(LUNA, processDataLuna(data.data[21]), UST),
        createTokenData(ETH, processData(data.data[18])/1000000000000, UST),
        createTokenData(AVAX, processData(data.data[19]), UST, Wormhole),
        createTokenData(AVAX, processData(data.data[20]), UST, Axelar),
        createTokenData(SOL, processDataSol(dataSolUst.data), UST, Wormhole),
        createTokenData(BNB, processData(data.data[21])/1000000000000, UST),
        createTokenData(FTM, processData(data.data[22]), UST, Wormhole),
    ];
}

const ETH_CURVE_3POOL_ADDRESS = "0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7";
const createCurve = (data) => {
    const result = [];
    for (const item of data.data.poolData) {
        if (item.address === ETH_CURVE_3POOL_ADDRESS) {
            let sum = 0;
            for (const coin of item.coins) {
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
    return { amount: val, name: name };
}

const createTokenData = (network, amount, coin, bridge) => {
    return { network: network, amount: amount, coin: coin, bridge: bridge };
}
const processData = (data) => {
    return parseInt(data.result) / 1000000;
}
const processDataAurora = (data) => {
    return data.result ? parseInt(data.result.totalSupply) / Math.pow(10, parseInt(data.result.decimals)) : 0;
}
const processDataSol = (data) => {
    return parseInt(data.marketCapFD);
}
const processDataLuna = (data) => {
    return data.uusd ? parseInt(data.uusd[0].total) / 1000000 : 0;
}
const processDataAlgo = (data) => {
    return parseInt(data.asset.params["circulating-supply"] / 1000000);
}