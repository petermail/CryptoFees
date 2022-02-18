import { getInflationAsync, getCurrentInflationAsync } from "./ServerLogic";

export const calculateInflationAsync = async () => {
    const data = await getCurrentInflationAsync();
    const currentSupply = getSupplyData(data.data[0]);
    const data2 = await getInflationAsync();
    const prevSupply = data2.data[0];
    compareData(prevSupply, currentSupply);
    return currentSupply.result;
}

const getSupplyData = (data) => {
    const result = [];
    let timestamp;
    for (let item of data) {
        result.push({ Coin: item.name, Supply: item.circulating_supply });
        timestamp = item.last_updated;
    }
    return { result, timestamp };
}
const compareDates = (prev, curr) => {
    return new Date(curr.timestamp) - new Date(prev[0]);
}
const compareData = (prev, curr) => {
    const timeDiff = 365 * 24 * 60 * 60 / (compareDates(prev, curr) / 1000);

    for (let i = 0; i < prev[1].length; ++i) {
        const itemPrev = prev[1][i];
        const itemCurr = curr.result[i];
        if (itemPrev.Coin === itemCurr.Coin) {
            curr.result[i].inflation = 100 * timeDiff * (itemCurr.Supply - itemPrev.Supply) / itemCurr.Supply;
            //console.log("inflation " + itemCurr.Coin + ": " + itemCurr.Supply + " - " + itemPrev.Supply);
        }
    }
    //console.log(curr);
}