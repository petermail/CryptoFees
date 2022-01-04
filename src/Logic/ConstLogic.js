
export const convCoinName = (name) => {
    switch (name){
        case "Cronos": return "CRO";
        case "Polygon": return "MATIC";
        case "BEP20": return "BNB";
        case "HECO": return "HT";
        case "AVAXC": return "AVAX";
        default: return name;
    }
}