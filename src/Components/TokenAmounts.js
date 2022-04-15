import { useState, useEffect } from 'react'
import { CoinImage } from "./Tile"
import { getUsdAsync } from '../Logic/TokenLogic';

export const TokenAmounts = () => {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        loadTokensAsync();
    }, []);
    const loadTokensAsync = async () => {
        const u = await getUsdAsync();
        setTokens(x => u);
    }

    return (
        <div>
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