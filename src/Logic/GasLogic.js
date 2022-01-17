import { getGasAsync } from './ServerLogic'

export const loadGasAsync = async () => {
    let data = await getGasAsync();

    console.log(data);
    return [privateConvertGas(0, "ETH", "GWEI", data.data[0].result),
        privateConvertGas(1, "MATIC", "GWEI", data.data[1].result),
        privateConvertGas(2, "BNB", "GWEI", data.data[2].result)
    ];
}

const privateConvertGas = (id, chain, gasUnit, data) => {
    return { 
        id: id,
        chain: chain, 
        gasUnit: gasUnit,
        gas: data.ProposeGasPrice, 
        gasSafe: data.SafeGasPrice, 
        gasFast: data.FastGasPrice,
        baseFee: data.suggestBaseFee,
        price: data.UsdPrice
    };
}