import { convCoinName, splitCoinNames } from "../Logic/ConstLogic";


export const Tile = (props) => {
    const { coin, data, prices } = props;

    return (
        <>
            <tr>
                <td rowSpan={data.length+1}>
                    <CoinImage coin={coin} />
                </td>
            </tr>
            {data.map(x => <Chain key={x.id} coin={coin} prices={prices} {...x} />)}
            <tr><td colSpan={5}><hr /></td>
            </tr>
        </>
    )
}

export const Chain = (props) => {
    const { coin, prices, chain, feeCrypto, feeHuobi, feeCoinEx } = props;
    const price = prices.filter(x => x.coin === coin)[0]?.price;
    //console.log("price: " + price);

    return (
        <tr className="hoverable">
            <td><div className="flex">
                <CoinImage coin={chain} />
                </div>
            </td>
            <td>{ price && feeCrypto !== undefined ? "$" + Math.round(feeCrypto * price * 100) / 100 : ""}</td>
            <td>{ price && feeHuobi !== undefined ? "$" + Math.round(feeHuobi * price * 100) / 100 : ""}</td>
            <td>{ price && feeCoinEx !== undefined ? "$" + Math.round(feeCoinEx * price * 100) / 100 : ""}</td>
        </tr>
    )
}

export const CoinImage = (props) => {
    const { coin } = props;
    const coinName = convCoinName(coin);
    const coinNames = splitCoinNames(coinName);

    if (coinNames.length > 1) {
        return (
            <div className="flex margin1">
                { coinNames.map(x => (<Img key={x} coin={convCoinName(x)} />)) }
                <div className="gap">{coinName}</div>
            </div>
        );
    } else 
        return (
            <div className="flex margin1">
                <Img coin={coinName} />
                <div className="gap">{coinName}</div>
            </div>
        )
}
export const Img = (props) => {
    const { coin } = props;

    return (
        <img src={process.env.PUBLIC_URL + "/Images/" + coin + ".png"} alt="" height={24} /> 
    )
}