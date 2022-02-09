import { getServerDataAsync } from './ServerLogic'
import { FTM, USDC, USDT, ETH, BTC, BNB, MATIC, HT, AVAX, MOVR, CRO } from './ConstLogic'

export const getUsdcAsync = async () => {
    const data = await getServerDataAsync(["etherscanUsdc", "polygonscanUsdc", "bscscanUsdc", 
        "avaxUsdc", "ftmUsdc", "movrUsdc",
        "etherscanUsdt", "polygonscanUsdt", "bscscanUsdt", 
        "avaxUsdt", "ftmUsdt", "movrUsdt",
        "croUsdt", "croUsdc"]);
    return [createTokenData(ETH, processData(data.data[6]), USDT),
        createTokenData(MATIC, processData(data.data[7]), USDT),
        createTokenData(BNB, processData(data.data[8])/1000000000000, USDT),
        createTokenData(AVAX, processData(data.data[9]), USDT),
        createTokenData(FTM, processData(data.data[10]), USDT),
        createTokenData(MOVR, processData(data.data[11]), USDT),
        createTokenData(CRO, processData(data.data[12]), USDT),
        createTokenData(ETH, processData(data.data[0]), USDC),
        createTokenData(MATIC, processData(data.data[1]), USDC),
        createTokenData(BNB, processData(data.data[2])/1000000000000, USDC),
        createTokenData(AVAX, processData(data.data[3]), USDC),
        createTokenData(FTM, processData(data.data[4]), USDC),
        createTokenData(MOVR, processData(data.data[5]), USDC),
        createTokenData(CRO, processData(data.data[13]), USDC)
    ];
}

const createTokenData = (network, amount, coin) => {
    return { network: network, amount: amount, coin: coin };
}
const processData = (data) => {
    return parseInt(data.result) / 1000000;
}