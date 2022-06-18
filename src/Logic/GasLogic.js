import { getGasAsync, getServerDataAsync } from './ServerLogic'

export const loadGasAsync = async (onUpdate, onFinish) => {
    let res = [];
    //const data = await getGasAsync();
    const services = [["etherscanGas", "polygonscanGas", "bscscanGas", "avaxGas", "ftmGas"],
        ["empty", "empty", "empty", "empty", "empty", "moonriverGas", "xmrGas", "hecoinfoGas", "croGas", "arbGas"]];
        // "lunaGas"
    for (const service of services) {
        const data = await getServerDataAsync(service);

        //console.log(data);
        //console.log(data.data[9].data);
        res = [addData(res, 0, () => privateConvertGas(0, "ETH", "GWEI", data.data[0]?.result)),
            addData(res, 1, () =>  privateConvertGas(3, "AVAX", "nAVAX", data.data[3]?.result)),
            addData(res, 2, () =>  privateConvertGas(2, "BNB", "GWEI", data.data[2]?.result)),
            addData(res, 3, () =>  privateConvertGas(1, "MATIC", "GWEI", data.data[1]?.result)),
            addData(res, 4, () =>  privateConvertGas(4, "FTM", "GWEI", data.data[4]?.result)),
            addData(res, 5, () =>  privateConvertCoinToolGas(8, "CRO", "GWEI", data.data[8]?.data)),
            addData(res, 6, () =>  privateConvertGas(7, "HT", "GWEI", data.data[7]?.result)),
            addData(res, 7, () =>  privateConvertGas(5, "MOVR", "GWEI", data.data[5]?.result)),
            addData(res, 8, () =>  privateConvertCoinToolGas(9, "Arbitrum", "GWEI", data.data[9]?.data)),
            addData(res, 9, () =>  privateXmrGas(6, "XMR", "mXMR", data.data[6]?.data)),
            //addData(res, 10, () =>  privateLunaGas(7, "LUNA", "mUST", data.data[3])),
        ];
        if (onUpdate) {
            //console.log(res);
            onUpdate([...res]);
        }
    }
    onFinish();
}
const addData = (res, index, processed) => {
    return (index < res.length && res[index].gas) ? res[index] : processed();
}

const privateXmrGas = (id, chain, gasUnit, data) => {
    if (!data) { return getEmpty(id, chain, gasUnit); }
    const avgSizeByte = 2000;
    const gas = Math.round(1000000 * data.suggested_transaction_fee_per_byte_sat * avgSizeByte / 100000000);
    return {
        id: id,
        chain: chain,
        gasUnit: gasUnit,
        gas: gas,
        gasSafe: gas,
        gasFast: gas,
    };
}
const privateLunaGas = (id, chain, gasUnit, data) => {
    if (!data) { return getEmpty(id, chain, gasUnit); }
    //console.log(data);
    const gas = parseFloat(data.uusd)*100;
    //console.log(gas);
    return { id: id, chain: chain, gasUnit: gasUnit,
        gas: gas,
        gasSafe: gas,
        gasFast: gas,
        price: 1,
     };
}
const privateConvertGas = (id, chain, gasUnit, data) => {
    if (!data) { return getEmpty(id, chain, gasUnit); }
    return { 
        id: id,
        chain: chain, 
        gasUnit: gasUnit,
        gas: Math.round(data.ProposeGasPrice), 
        gasSafe: Math.round(data.SafeGasPrice), 
        gasFast: Math.round(data.FastGasPrice),
        baseFee: data.suggestBaseFee,
        price: data.UsdPrice
    };
}
const privateConvertCoinToolGas = (id, chain, gasUnit, data) => {
    if (!data) { return getEmpty(id, chain, gasUnit); }
    return {
        id: id,
        chain: chain,
        gasUnit: gasUnit,
        gas: data.normal.price/1000000000,
        gasSafe: data.slow.price/1000000000,
        gasFast: data.fast.price/1000000000,
    };
}
const getEmpty = (id, chain, gasUnit) => {
    return { id: id, chain: chain, gasUnit: gasUnit };
}