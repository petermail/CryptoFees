import { LUNA, BNB, ETH, OSMO, UST, SCRT, XMR, ATOM } from './ConstLogic'

export const getBridges = () => {
    const result = [];
    result.push(createBridge(0, "Terra Bridge", "only source blockchain fees apply", "https://bridge.terra.money/", [LUNA, UST],
        [createBridgeCoins(0, LUNA, ETH), createBridgeCoins(1, LUNA, BNB), createBridgeCoins(2, LUNA, OSMO),
            createBridgeCoins(3, ETH, LUNA), createBridgeCoins(4, BNB, LUNA)]));
    result.push(createBridge(1, "Secret Bridge", "only source blockchain fees apply", "https://bridge.scrt.network/", [], 
        [createBridgeCoins(0, ETH, SCRT), createBridgeCoins(1, BNB, SCRT), createBridgeCoins(2, XMR, SCRT), 
            createBridgeCoins(3, SCRT, ETH), createBridgeCoins(4, SCRT, BNB), createBridgeCoins(5, SCRT, XMR)]));
    result.push(createBridge(2, "Secret Wrap", "only source blockchain fees apply", "https://wrap.scrt.network/", [],
        [createBridgeCoins(0, ATOM, SCRT), createBridgeCoins(1, LUNA, SCRT), createBridgeCoins(2, OSMO, SCRT),
        createBridgeCoins(3, SCRT, ATOM), createBridgeCoins(4, SCRT, LUNA), createBridgeCoins(5, SCRT, OSMO)]));
    return result;
}

const createBridge = (id, name, feeNote, link, usedCoins, coins) => {
    return { id: id, name: name, coins: coins, feeNote: feeNote, usedCoins: usedCoins, link: link };
}
const createBridgeCoins = (id, fromCoin, toCoin) => {
    return { id: id, fromCoin: fromCoin, toCoin: toCoin };
}