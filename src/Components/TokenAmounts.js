import { useState, useEffect } from 'react'
import { CoinImage, Img } from "./Tile"
import { getCurveAsync, getCurveFactoryAsync, getUsdAsync } from '../Logic/TokenLogic';
import { Table } from './Table';
import { BUSD, DAI, FRAX, MIM, USDC, USDT, UST } from '../Logic/ConstLogic';

export const TokenAmounts = () => {
    const [tokens, setTokens] = useState([]);
    const [curve, setCurve] = useState([]);
    const [factory, setFactory] = useState([]);

    useEffect(() => {
        loadTokensAsync();
    }, []);
    const loadTokensAsync = async () => {
        const u = await getUsdAsync();
        setTokens(x => u);
        const c = await getCurveAsync();
        setCurve(x => c);
        const f = await getCurveFactoryAsync();
        setFactory(x => f);
    }

    return (
        <div>
            <div className="flex">
            <table>
                <thead>
                    <tr>
                        <td>Blockchain</td>
                        <td>Amount</td>
                        <td>Coin</td>
                        <td>Bridge</td>
                    </tr>
                    <tr>
                        <td colSpan={4}><hr /></td>
                    </tr>
                </thead>
                <tbody>
                    { tokens && tokens.length > 0 &&
                        tokens.map(x => 
                            <TokenAmount key={x.network+x.coin+x.bridge} network={x.network} amount={x.amount} coin={x.coin} bridge={x.bridge} />)
                    }
                    { (tokens === null || tokens.length === 0) &&
                        <tr><td colSpan={3}><div>Loading data...</div></td></tr>
                    }
                </tbody>
            </table>
            <div>
                <Table headers={["Stablecoin", "Type"]} rows={[[<CoinImage coin={USDC} />, "centralized"], [<CoinImage coin={USDT} />, "centralized"], 
                    [<CoinImage coin={BUSD} />, "centralized"], [<CoinImage coin={DAI} />, "decentralized"], [<CoinImage coin={MIM} />, "decentralized"], 
                    [<CoinImage coin={FRAX} />, "decentralized"], [<CoinImage coin={UST} />, "de-pegged"]]}>
                </Table>
                <CurvePool data={curve} superheader={"Curve stable pool on Ethereum"} />
                <CurvePool data={factory} superheader={"Curve USDD pool on Ethereum"} />
            </div>
            </div>
            <br />
            <div>
                Some stablecoin amount can be counted twice because token can be locked on one network and equivalent created on other. E.g. tokens can be locked on Ethereum network in a bridge contract and new token is created on Solana with backing of the original tokens on Ethereum.
            </div>
        </div>
    )
}

const TokenAmount = (props) => {
    const { network, amount, coin, bridge } = props;

    return (
        <tr className="hoverable">
            <td><CoinImage coin={network} /></td>
            <td>${Math.round(amount).toLocaleString(undefined)}</td>
            <td><CoinImage coin={coin} /></td>
            <td>{bridge}</td>
        </tr>
    )
}

const CurvePool = (props) => {
    const { data, superheader } = props;

    const makeRows = (items) => {
        return items.length === 0 ? [["", "loading data"]] 
        : items.map(x => ([<CoinImage key={x.name} coin={x.name} />, 
            "$"+Math.round(x.amount).toLocaleString(undefined),
            Math.round(x.perc*100) + "%"]));
    }

    return (
        <Table superheader={superheader} headers={["Coin", "Amount", "%"]} rows={makeRows(data)} />
    )
}