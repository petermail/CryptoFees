import { getGasAsync } from './ServerLogic'

export const loadGasAsync = async () => {
    let data = await getGasAsync();

    //console.log(data);
    return [privateConvertGas(0, "ETH", "GWEI", data.data[0].result),
        privateConvertGas(1, "MATIC", "GWEI", data.data[1].result),
        privateConvertGas(2, "BNB", "GWEI", data.data[2].result),
        privateConvertGas(3, "AVAX", "nAVAX", data.data[4].result),
        privateConvertGas(4, "FTM", "GWEI", data.data[5].result),
        privateConvertGas(5, "MOVR", "GWEI", data.data[6].result),
        privateXmrGas(6, "XMR", "mXMR", data.data[7].data)
    ];
}

const privateXmrGas = (id, chain, gasUnit, data) => {
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
const privateConvertGas = (id, chain, gasUnit, data) => {
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