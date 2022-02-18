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
                    <tr><td>Network</td><td>Inflation per year</td></tr>
                    <tr><td colSpan={2}><hr /></td></tr>
                </thead>
                <tbody>
                    { inflation && inflation.filter(x => x.inflation).map(x =>
                        <InflationItem key={x.Coin} {...x} />
                    )}
                </tbody>
            </table>
        </div>
    )
}

const InflationItem = (props) => {
    const { Coin, inflation } = props;
    return (
        <tr className="hoverable">
            <td><CoinImage coin={convCoinName(Coin)} /></td>
            <td>{Math.round(inflation * 10)/10} %</td>
        </tr>
    )
}