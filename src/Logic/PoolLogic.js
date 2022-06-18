import { getServerDataAsync } from "./ServerLogic";
import { FTM, USDC, USDT, ETH, BTC, BNB, MATIC, HT, AVAX, GLMR, AURORA, USDD, MOVR } from './ConstLogic';

export const getPoolsAsync = async (onFinish) => {
    let fullResult = [];
    getServerDataAsync(
        ["autoBnb", "autoAvax", "autoHt"]).then(x => {
            const result = { farm: 'Autofarm', data: [processAutofarmData(x.data[0], BNB), 
                processAutofarmData(x.data[1], AVAX),
                processAutofarmData(x.data[2], HT)] };
            fullResult.push(result);
            //console.log(fullResult);
            onFinish(fullResult);
        });
    getServerDataAsync(["beefy"]).then(x => {
        //console.log(x.data[0]);
        const result = { farm: 'Beefy', data: processBeefyData(x.data[0]) };
        fullResult.push(result);
        //console.log(fullResult);
        onFinish(fullResult);
    });
}

const processAutofarmData = (data, chain) => {
    const result = [];
    if (data && data.pools){
        for (const key in data.pools) {
            const item = data.pools[key];
            //console.log(item);
            if (item.allowDeposits) {
                const newItem = createPool(item.wantName, item.APY_total, item.farmName);
                //console.log(newItem);
                if (filterAutofarmData(newItem.pool)) {
                    result.push(newItem);
                }
            }
        }
    }
    return { chain: chain, pools: result };
}
const processBeefyData = (data) => {
    const results = [];
    for (const key in data) {
        if (filterBeefyData(key)) {
            //console.log(key);
            var chain = getBeefyChain(key)?.toLowerCase();
            if (chain === 'ftm') { chain = 'fantom'; }
            const url = `https://app.beefy.com/#/${chain}/vault/${key}`;
            results.push(createPool(key, data[key].totalApy, '', url));
        }
    }
    const res = [{chain: GLMR, pools: []}, {chain: FTM, pools: []},
        {chain: "Arbitrum", pools: []}, {chain: AURORA, pools: []},
        {chain: AVAX, pools: []}];
    for (const r in results) {
        const pool = results[r].pool;
        const title = processTitleBeefy(pool);
        const chain = getBeefyChain(pool);
        if (!chain) { continue; }
        results[r].pool = title;
        const resIndex = res.map(x => x.chain).indexOf(chain);
        if (resIndex === -1){
            res.push({ chain: chain, pools: [results[r]] })
        } else {
            res[resIndex].pools.push(results[r]);
        }
    }
    //console.log(res);
    return res;
}

const processTitleBeefy = (name) => {
    if (name === 'spell-mim-crv'){
        return 'MIM-USDC-USDT';
    } else if (name === 'spell-ftm-mim-crv') {
        return 'MIM-USDC-fUSDT';
    } else if (name === 'curve-avax-f-3pool') {
        return 'USTW-USDC-USDT';
    } else if (name === 'sushi-mr-frax-usdc') {
        return 'FRAX-USDC';
    } else if (name === 'rose-ust-3pool') {
        return 'UST-USDT-USDC-DAI';
    } else if (name === 'solarbeam-frax-3pool') {
        return 'FRAX-USDC-BUSD-USDT';
    } else if (name === 'curve-arb-2pool') {
        return 'USDC-USDT';
    } else if (name === 'hector-tor-crv') {
        return 'TOR-USDC-DAI';
    } else if (name === 'ellipsis-usdd') {
        return 'USDD-USDT-USDC-BUSD';
    } else if (name === 'ellipsis-usdd2pool') {
        return 'USDD-BUSD';
    } else if (name.indexOf('stargate') === 0) {
        return name.substring(name.lastIndexOf('-') + 1).toUpperCase();
    } else return name.substring(name.indexOf('-') + 1).toUpperCase();
}

var currentId = 0;
const createPool = (pool, apy, farm, url) => {
    return { id: (currentId++), pool: pool, apy: apy, farm: farm, url: url };
}

const filterAutofarmData = (name) => {
    return ["fUSDT", "beltUSDT", "ibBUSD", "ibUSDT", "ibBTCB", "ibETH", 
    "USDT-USDC-BUSD-DAI BLP", "beltBTC", "beltETH",
    "DAI-USDC-USDT-HUSD LP",
    "WETH.e", "WBTC.e", "USDT.e", "DAI.e", "S*BUSD", "S*USDT", "S*USDC",
    USDT, USDC, ETH, BTC].includes(name);
}

const getBeefyChain = (title) => {
    switch (title){
        //case 'png-ust-usdc':
        case 'aavev3-usdt':
        case 'stargate-avax-usdc':
        case 'stargate-avax-usdt':
        //case 'curve-avax-f-3pool':
        //case 'png-ustw-usdc': 
            return AVAX;
        case 'beamswap-usdc-busd':
        case 'stellaswap-usdc-usdt':
        case 'beamswap-usdc-usdt':
        case 'beamswap-dai-usdc':
        case 'sushi-mr-frax-usdc':
        case 'stellaswap-dai-usdc': return GLMR;
        case 'solarbeam-frax-3pool': return MOVR;
        //case 'scream-mim':
        //case 'scream-usdc':
        //case 'scream-usdt':
        case 'spell-ftm-mim-crv':
        case 'stargate-fantom-usdt':
        case 'stargate-fantom-usdc':
        case 'hector-tor-crv':
        case 'spirit-mim-usdc': return FTM;
        //case 'rose-ust-3pool':
        case 'trisolaris-usdt-usdc': return AURORA;
        case 'curve-arb-2pool':
        case 'spell-mim-crv': return "Arbitrum";
        case 'ellipsis-usdd2pool':
        case 'ellipsis-usdd': return BNB;
        default: return null;
    }
}
const filterBeefyData = (name) => {
    const sub = name ? name.substring(name.indexOf('-') + 1) : '';
    return ["ustw-usdc", "dai-usdt", "dai-usdc", "usdc-usdt", "usdt-usdc", 
        "mim-usdc.e", "ust-usdc", "usdc-busd", "mim-usdc",
        "mim-crv", "ftm-mim-crv", "mim", "usdc", "usdt", "dai", 'usdd',
        "avax-usdc", 'avax-usdt', 'fantom-usdc', 'fantom-usdt',
        'avax-f-3pool', 'mr-frax-usdc', 'ust-3pool', 'frax-3pool',
        'arb-2pool', 'tor-crv', 'usdd2pool'].includes(sub);
}