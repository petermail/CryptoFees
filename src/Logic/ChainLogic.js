import { AURORA, AVAX, Axelar, BNB, CRO, ETH, FTM, GLMR, HT, MATIC, MOVR, NEAR, SOL, TRX, USDC, USDD, USDT, USN, UST, Wormhole } from "./ConstLogic";

export const getChains = () => {
    const result = [
        createChain(USDC, ETH, "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"),
        createChain(USDC, BNB, "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d"),
        createChain(USDC, SOL, "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"),
        createChain(USDC, MATIC, "0x2791bca1f2de4661ed88a30c99a7a9449aa84174"),
        createChain(USDC, AVAX, "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e"),
        createChain(USDC, FTM, "0x04068da6c83afcfa0e13ba15a6696662335d5b75"),
        createChain(USDC, MOVR, "0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d"),
        createChain(USDC, AURORA, "0xb12bfca5a55806aaf64e99521918a4bf0fc40802"),
        createChain(USDC, CRO, "0xc21223249ca28397b4b6541dffaecc539bff0c59"),
        createChain(USDC, GLMR, "0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b"),
        createChain(USDC, "Arbitrum", "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8"),
        createChain(USDC, HT, "0x9362bbef4b8313a8aa9f0c9808b80577aa26b73b"),
        createChain(USDC, TRX, "TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8"),
        createChain(USDC, "Optimism", "0x7f5c764cbc14f9669b88837ca1490cca17c31607"),
        createChain(USDC, NEAR, "a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near"),

        createChain(USDT, ETH, "0xdac17f958d2ee523a2206206994597c13d831ec7"),
        createChain(USDT, BNB, "0x55d398326f99059ff775485246999027b3197955"),
        createChain(USDT, SOL, "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB"),
        createChain(USDT, MATIC, "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"),
        createChain(USDT, AVAX, "0xc7198437980c041c805a1edcba50c1ce5db95118"),
        createChain(USDT, FTM, "0x049d68029688eabf473097a2fc38ef61633a3c7a"),
        createChain(USDT, MOVR, "0xb44a9b6905af7c801311e8f4e76932ee959c663c"),
        createChain(USDT, AURORA, "0x4988a896b1227218e4a686fde5eabdcabd91571f"),
        createChain(USDT, CRO, "0x66e428c3f67a68878562e79a0234c1f83c208770"),
        createChain(USDT, GLMR, "0xefaeee334f0fd1712f9a8cc375f427d9cdd40d73"),
        createChain(USDT, "Arbitrum", "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"),
        createChain(USDT, HT, "0xa71edc38d189767582c38a3145b5873052c3e47a"),
        createChain(USDT, TRX, "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"),
        createChain(USDT, "Optimism", "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58"),
        createChain(USDT, NEAR, "dac17f958d2ee523a2206206994597c13d831ec7.factory.bridge.near"),

        createChain(USDD, TRX, "TPYmHEhy5n8TCEfYGqW2rPxsghSfzghPDn"),

        createChain(USN, NEAR, "usn"),
        createChain(USN, AURORA, "0x5183e1b1091804bc2602586919e6880ac1cf2896"),

        createChain(UST, ETH, "0xa47c8bf37f92abed4a126bda807a7b7498661acd"),
        createChain(UST, BNB, "0x23396cf899ca06c4472205fc903bdb4de249d6fc"),
        createChain(UST, SOL, "9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i", Wormhole),
        createChain(UST, AVAX, "0xb599c3590F42f8F995ECfa0f85D2980B76862fc1", Wormhole),
        createChain(UST, AVAX, "0x260bbf5698121eb85e7a74f2e45e16ce762ebe11", Axelar),
        createChain(UST, FTM, "0x846e4d51d7e2043c1a87e0ab7490b93fb940357b", Wormhole),
    ];
    return result;
}

const createChain = (coin, chain, address, bridge) => {
    return { coin: coin, chain: chain, address: address, bridge: bridge };
}