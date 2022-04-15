import { getInflationAsync, getCurrentInflationAsync, getInflation2Async } from "./ServerLogic";
import { convCoinName } from "./ConstLogic";

export const calculateInflationAsync = async () => {
    const data = await getCurrentInflationAsync();
    const fullData = [];
    fullData.push(...data.data[0]);
    fullData.push(...data.data[1]);
    //console.log(fullData);
    const currentSupply = getSupplyData(fullData);
    const data2 = await getInflationAsync();
    const prevSupply = data2.data[0];
    compareData(prevSupply, currentSupply);
    const data3 = await getInflation2Async();
    compareData2(data3.data[0], currentSupply);
    //console.log(currentSupply.result);
    return currentSupply.result;
}

const getSupplyData = (data) => {
    const result = [];
    let timestamp;
    for (let item of data) {
        result.push({ Coin: convCoinName(item.name), Supply: item.circulating_supply });
        if (!timestamp) {
            timestamp = item.last_updated;
            //console.log(timestamp);
        }
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
        const prevCoin = convCoinName(itemPrev.Coin);
        for (let j = 0; j < curr.result.length; ++j) {
            const itemCurr = curr.result[j];
            if (prevCoin === itemCurr.Coin) {
                curr.result[j].inflation = 100 * timeDiff * (itemCurr.Supply - itemPrev.Supply) / itemPrev.Supply;
                //console.log("inflation " + itemCurr.Coin + ": " + itemCurr.Supply + " - " + itemPrev.Supply);
            }
        }
    }
    //console.log(curr);
}

const compareData2 = (prev, curr) => {
    const timeDiff = 365 * 24 * 60 * 60 / (compareDates(prev, curr) / 1000);

    for (let i = 0; i < prev[1].length; ++i) {
        const itemPrev = prev[1][i];
        const prevCoin = convCoinName(itemPrev.Coin);
        for (let j = 0; j < curr.result.length; ++j) {
            const itemCurr = curr.result[j];
            if (prevCoin === itemCurr.Coin) {
                curr.result[j].inflation2 = 100 * timeDiff * (itemCurr.Supply - itemPrev.Supply) / itemPrev.Supply;
            }
        }
    }
}