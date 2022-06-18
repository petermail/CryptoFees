import { useState, useEffect } from 'react'
import { CoinImage, Img } from "./Tile"
import { getAlgoFiAsync, getCurveAsync, getCurveFactoryAsync, getTronAsync, getUsdAsync } from '../Logic/TokenLogic';
import { Table } from './Table';
import { ALGO, BUSD, DAI, ETH, FRAX, FTM, MIM, TRX, USDC, USDT, UST } from '../Logic/ConstLogic';

import ExternalLink from '../Images/external_link.png'
import { ExtLink } from './Links';

export const TokenAmounts = () => {
    const [tokens, setTokens] = useState([]);
    const [curve, setCurve] = useState([]);
    const [factory, setFactory] = useState([]);
    const [tron, setTron] = useState([]);
    const [algoFi, setAlgoFi] = useState(-1);

    useEffect(() => {
        loadTokensAsync();
    }, []);
    const loadTokensAsync = async () => {
        getUsdAsync(u => { 
            setTokens(x => u); 
        } );
        const c = await getCurveAsync();
        setCurve(x => c);
        const f = await getCurveFactoryAsync();
        setFactory(x => f);
        const t = await getTronAsync();
        setTron(x => t);
        const a = await getAlgoFiAsync();
        setAlgoFi(x => a);
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
                <CurvePool data={curve} superheader={"Curve stable pool on Ethereum"} coin={ETH} link="https://curve.fi/3pool" />
                <CurvePool data={factory[0]} superheader={"Curve USDD pool on Ethereum"} coin={ETH} link="https://curve.fi/factory/116" />
                <CurvePool data={factory[1]} superheader={"Curve TOR pool on Fantom"} coin={FTM} link="https://ftm.curve.fi/factory/62" />
                <CurvePool data={tron} superheader="SUN 3pool" coin={TRX} link="https://sun.io/#/usdd_3pool?tab=swap" />
                <Table headers={[]} superheader={<ExtLink title="STBL price" coin={ALGO} href="https://app.algofi.org/stability" />} rows={[[algoFi > -1 ? algoFi : "loading data"]]}></Table>
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
            <td>${amount ? Math.round(amount).toLocaleString(undefined) : '   ----------'}</td>
            <td><CoinImage coin={coin} /></td>
            <td>{bridge}</td>
        </tr>
    )
}

const CurvePool = (props) => {
    const { data, superheader, link, coin } = props;

    const makeRows = (items) => {
        if (!items) { return; }
        return items.length === 0 ? [["", "loading data"]] 
        : items.map(x => ([<CoinImage key={x.name} coin={x.name} />, 
            "$"+Math.round(x.amount).toLocaleString(undefined),
            Math.round(x.perc*100) + "%"]));
    }

    if (link) {
        return (
            <Table superheader={<ExtLink coin={coin} href={link} title={superheader} />} headers={["Coin", "Amount", "%"]} rows={makeRows(data)} />
        )
    } else {
        return (
            <Table superheader={superheader} headers={["Coin", "Amount", "%"]} rows={makeRows(data)} />
        )
    }
}