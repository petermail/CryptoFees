
export const convCoinName = (name) => {
    switch (name){
        case "Crypto.com Coin":
        case "Cronos": return "CRO";
        case "Polygon": return MATIC;
        case "BEP20": return "BNB";
        case "Huobi Token":
        case "HECO": return "HT";
        case "Avalanche":
        case "AVAXC": return AVAX;
        case "USDT.e":
        case "ibUSDT":
        case "fUSDT": return "USDT";
        case "WETH.e":
        case "beltETH":
        case "ibETH": return "ETH";
        case "WBTC.e":
        case "Bitcoin":
        case "beltBTC":
        case "ibBTCB": return "BTC";
        case "ibBUSD": return "BUSD";
        case "DAI.e": return "DAI";
        case "Ethereum": return "ETH";
        case "Binance Coin": return BNB;
        case "Solana": return SOL;
        case "Terra": return LUNA;
        case "Dogecoin": return DOGE;
        case "Stellar": return XLM;
        case "Fantom": return FTM;
        case "Monero": return XMR;
        case "Secret": return SCRT;
        case "Moonriver": return MOVR;
        case "Polkadot": return DOT;
        case "Shiba Inu": return SHIB;

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
export const MOVR = "MOVR";
export const CRO = "CRO";
export const SOL = "SOL";
export const DOGE = "DOGE";
export const SHIB = "SHIB";
export const XLM = "XLM";
export const DOT = "DOT";

// APIs:
// https://api-osmosis.imperator.co/pools/v1/all
