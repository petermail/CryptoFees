
export const convCoinName = (name) => {
    switch (name){
        case "Cronos": return "CRO";
        case "Polygon": return "MATIC";
        case "BEP20": return "BNB";
        case "HECO": return "HT";
        case "AVAXC": return "AVAX";
        case "USDT.e":
        case "ibUSDT":
        case "fUSDT": return "USDT";
        case "WETH.e":
        case "beltETH":
        case "ibETH": return "ETH";
        case "WBTC.e":
        case "beltBTC":
        case "ibBTCB": return "BTC";
        case "ibBUSD": return "BUSD";
        case "DAI.e": return "DAI";
        default: return name;
    }
}

export const LUNA = "LUNA";
export const BNB = "BNB";
export const ETH = "ETH";
export const BTC = "BTC";
export const OSMO = "OSMO";
export const UST = "UST";
export const SCRT = "SCRT";
export const XMR = "XMR";
export const ATOM = "ATOM";
export const FTM = "FTM";
export const USDC = "USDC";
export const USDT = "USDT";
export const BUSD = "BUSD";
export const HT = "HT";
export const MATIC = "MATIC";
export const AVAX = "AVAX";

// APIs:
// https://api-osmosis.imperator.co/pools/v1/all
