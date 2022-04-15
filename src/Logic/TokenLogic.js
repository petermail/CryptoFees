import { getDataAsync, getServerDataAsync } from './ServerLogic'
import { FTM, USDC, USDT, ETH, BTC, BNB, MATIC, HT, AVAX, MOVR, CRO, AURORA, GLMR, SOL, UST, Wormhole, Axelar, LUNA } from './ConstLogic'

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const getUsdAsync = async () => {
    const data = await getServerDataAsync(["etherscanUsdc", "polygonscanUsdc", "bscscanUsdc", 
        "avaxUsdc", "ftmUsdc", "movrUsdc",
        "etherscanUsdt", "polygonscanUsdt", "bscscanUsdt", 
        "avaxUsdt", "ftmUsdt", "movrUsdt",
        "croUsdt", "croUsdc", "auroraUsdt", "auroraUsdc", "glmrUsdt", "glmrUsdc",
        "etherscanUst", "avaxUstWormhole", "avaxUstAxelar", "terraUst", "bscscanUst",
        "ftmUst"]);
    //console.log(data.data[22]);
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
        createTokenData(MOVR, processData(data.data[5]), USDC),
        createTokenData(GLMR, processData(data.data[17]), USDC),
        
        createTokenData(ETH, processData(data.data[6]), USDT),
        createTokenData(BNB, processData(data.data[8])/1000000000000, USDT),
        createTokenData(SOL, processDataSol(dataSolUsdt.data), USDT),
        createTokenData(MATIC, processData(data.data[7]), USDT),
        createTokenData(AVAX, processData(data.data[9]), USDT),
        createTokenData(FTM, processData(data.data[10]), USDT),
        createTokenData(CRO, processData(data.data[12]), USDT),
        createTokenData(AURORA, processDataAurora(data.data[14]), USDT),
        createTokenData(MOVR, processData(data.data[11]), USDT),
        createTokenData(GLMR, processData(data.data[16]), USDT),

        createTokenData(LUNA, processDataLuna(data.data[21]), UST),
        createTokenData(ETH, processData(data.data[18])/1000000000000, UST),
        createTokenData(AVAX, processData(data.data[19]), UST, Wormhole),
        createTokenData(AVAX, processData(data.data[20]), UST, Axelar),
        createTokenData(SOL, processDataSol(dataSolUst.data), UST, Wormhole),
        createTokenData(BNB, processData(data.data[22])/1000000000000, UST),
        createTokenData(FTM, processData(data.data[23]), UST),
    ];
}

const createTokenData = (network, amount, coin, bridge) => {
    return { network: network, amount: amount, coin: coin, bridge: bridge };
}
const processData = (data) => {
    return parseInt(data.result) / 1000000;
}
const processDataAurora = (data) => {
    return parseInt(data.result.totalSupply) / Math.pow(10, parseInt(data.result.decimals));
}
const processDataSol = (data) => {
    return parseInt(data.marketCapFD);
}
const processDataLuna = (data) => {
    return parseInt(data.uusd[0].total)/1000000;
}