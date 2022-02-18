import { getServerDataAsync } from "./ServerLogic";
import { FTM, USDC, USDT, ETH, BTC, BNB, MATIC, HT, AVAX } from './ConstLogic';

export const getPoolsAsync = async () => {
    const data = await getServerDataAsync(
        ["autoBnb", "autoFtm", "autoHt", "autoAvax"]);
    return [processAutofarmData(data.data[0], BNB), 
        processAutofarmData(data.data[1], FTM),
        processAutofarmData(data.data[2], HT),
        processAutofarmData(data.data[3], AVAX)
    ];
}

const processAutofarmData = (data, chain) => {
    const result = [];
    for (const key in data.pools) {
        const item = data.pools[key];
        if (item.allowDeposits) {
            const newItem = createPool(item.wantName, item.APY_total, item.farmName);
            if (filterData(newItem.pool)) {
                result.push(newItem);
            }
        }
    }
    return { chain: chain, pools: result };
}

const createPool = (pool, apy, farm) => {
    return { id: pool + farm, pool: pool, apy: apy, farm: farm };
}

const filterData = (name) => {
    return ["fUSDT", "beltUSDT", "ibBUSD", "ibUSDT", "ibBTCB", "ibETH", 
    "USDT-USDC-BUSD-DAI BLP", "beltBTC", "beltETH",
    "DAI-USDC-USDT-HUSD LP",
    "WETH.e", "WBTC.e", "USDT.e", "DAI.e",
    USDT, USDC, ETH, BTC].includes(name);
}