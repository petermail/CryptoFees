import { useState, useEffect } from 'react'
import { CoinImage } from "./Tile"
import { getUsdcAsync } from '../Logic/TokenLogic';

export const TokenAmounts = () => {
    const [tokens, setTokens] = useState([]);

    useEffect(() => {
        loadTokensAsync();
    }, []);
    const loadTokensAsync = async () => {
        const u = await getUsdcAsync();
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
                    </tr>
                    <tr>
                        <td colSpan={3}><hr /></td>
                    </tr>
                </thead>
                <tbody>
                    { tokens && tokens.length > 0 &&
                        tokens.map(x => 
                            <TokenAmount key={x.network+x.coin} network={x.network} amount={x.amount} coin={x.coin} />)
                    }
                    { (tokens === null || tokens.length === 0) &&
                        <div>Loading data...</div>
                    }
                </tbody>
            </table>
        </div>
    )
}

const TokenAmount = (props) => {
    const { network, amount, coin } = props;

    return (
        <tr className="hoverable">
            <td><CoinImage coin={network} /></td>
            <td>${Math.round(amount).toLocaleString(undefined)}</td>
            <td><CoinImage coin={coin} /></td>
        </tr>
    )
}