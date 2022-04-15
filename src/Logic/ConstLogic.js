
export const splitCoinNames = (names) => {
    const res = [];
    if (names){
        const parts = names.split('-');
        for (const p in parts) {
            const p2 = parts[p].split(' ');
            for (const p2Key in p2) {
                res.push(p2[p2Key]);
            }
        }
    }
    return res;
}

export const getScansToken = (chain, token) => { 
    switch (chain) {
        case ETH: return "https://etherscan.io/token/" + token;
        case SOL: return "https://solscan.io/token/" + token;
        case AVAX: return "https://snowtrace.io/token/" + token;
        case FTM: return "https://ftmscan.com/token/" + token + "?a=" + token;
        case BNB: return "https://bscscan.com/token/" + token + "?a=" + token;
        case MOVR: return "https://moonriver.moonscan.io/token/" + token + "?a=" + token;
        case CRO: return "https://cronoscan.com/token/" + token + "?a=" + token;
        case MATIC: return "https://polygonscan.com/token/" + token + "?a=" + token;
        case GLMR: return "https://moonscan.io/token/" + token + "?a=" + token;
        case "Arbitrum": return "https://arbiscan.io/token/" + token + "?a=" + token;
        case AURORA: return "https://explorer.mainnet.aurora.dev/token/" + token + "/token-transfers";
        default: return null;
    }
}

export const convCoinName = (name) => {
    switch (name){
        case "NEAR Protocol": return "NEAR";
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
        case "S*USDT":
        case "fUSDT": return "USDT";
        case "USTW": return "UST";
        case "WETH.e":
        case "beltETH":
        case "ibETH": return "ETH";
        case "WBTC.e":
        case "Bitcoin":
        case "beltBTC":
        case "ibBTCB": return "BTC";
        case "S*BUSD":
        case "ibBUSD": return "BUSD";
        case "DAI.e": return "DAI";
        case "Ethereum": return "ETH";
        case "USDC.E": return "USDC";
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
        case "Cosmos Hub": return ATOM;
        case "Osmosis": return OSMO;
        case "Moonbeam": return GLMR;
        case "Anchor Protocol": return "ANC";
        case "Algorand": return ALGO;
        case "VVS Finance": return "VVS";
        case "MMFinance": return "MMF";
        case "Raydium": return "RAY";
        case "JOE": return "JOE";
        case "Spookyswap": return "BOO";
        case "Astroport": return "ASTRO";

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
export const RUNE = "RUNE";
export const GLMR = "GLMR";
export const AURORA = "AURORA";
export const ALGO = "ALGO";
export const HECO = "HECO";
export const FRAX = "FRAX";


export const Wormhole = "Wormhole";
export const Axelar = "Axelar";

// APIs:
// https://api-osmosis.imperator.co/pools/v1/all
