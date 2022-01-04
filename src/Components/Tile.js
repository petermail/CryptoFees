import { convCoinName } from "../Logic/ConstLogic";


export const Tile = (props) => {
    const { coin, data, prices } = props;

    return (
        <tbody>
            <tr>
                <td rowSpan={data.length+1}>
                    <CoinImage coin={coin} />
                </td>
            </tr>
            {data.map(x => <Chain key={x.id} coin={coin} prices={prices} {...x} />)}
            <tr><td colSpan={4}><hr /></td></tr>
        </tbody>
    )
}

export const Chain = (props) => {
    const { coin, prices, chain, feeCrypto, feeHuobi } = props;
    const price = prices.filter(x => x.coin === coin)[0]?.price;
    //console.log("price: " + price);

    return (
        <tr className="hoverable">
            <td><div className="flex">
                <CoinImage coin={chain} />
                </div>
            </td>
            <td>{ price && feeCrypto !== undefined ? Math.round(feeCrypto * price * 100) / 100 : ""}</td>
            <td>{ price && feeHuobi !== undefined ? Math.round(feeHuobi * price * 100) / 100 : ""}</td>
        </tr>
    )
}

export const CoinImage = (props) => {
    const { coin } = props;
    //const coinName = convCoinName(coin);

    return (
        <div className="flex margin1">
            <Img coin={coin} />
            <div className="gap">{coin}</div>
        </div>
    )
}
export const Img = (props) => {
    const { coin } = props;
    const coinName = convCoinName(coin);

    return (
        <img src={process.env.PUBLIC_URL + "/Images/" + coinName + ".png"} alt="" height={24} /> 
    )
}