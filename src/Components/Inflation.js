import { useState, useEffect } from 'react'
import { calculateInflationAsync } from '../Logic/InflationLogic'
import { convCoinName } from '../Logic/ConstLogic';
import { CoinImage } from './Tile';

export const Inflation = () => {
    const [inflation, setInflation] = useState([]);

    useEffect(() => {
        localCalculateInflationAsync();
    }, []);
    const localCalculateInflationAsync = async () => {
        let c = await calculateInflationAsync();
        setInflation(x => c);
        //console.log(c);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr><td>Network</td><td>Inflation per year</td><td>Recent inflation per year</td></tr>
                    <tr><td colSpan={3}><hr /></td></tr>
                </thead>
                <tbody>
                    { inflation && inflation.filter(x => x.inflation || x.inflation2).map(x =>
                        <InflationItem key={x.Coin} {...x} />
                    )}
                    { (inflation === null || inflation.length === 0) &&
                        <tr><td colSpan={3}><div>Loading data...</div></td></tr>
                    }
                </tbody>
            </table>
            <br />
            Inflation is calculated based on <a href="https://www.coingecko.com">CoinGecko</a> circulating supply data change in few months annualized to the whole year. The two columns show (first) long term inflation and (second) short term recent inflation. Short term inflation can be more impacted by rare updates of circulating supply data.
        </div>
    )
}

const InflationItem = (props) => {
    const { Coin, inflation, inflation2 } = props;
    return (
        <tr className="hoverable">
            <td><CoinImage coin={convCoinName(Coin)} /></td>
            <td>{inflation ? `${Math.round(inflation * 10)/10} %` : ''}</td>
            <td>{Math.round(inflation2 * 10)/10} %</td>
        </tr>
    )
}