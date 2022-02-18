import { useState, useEffect } from 'react'
import { Tile, Img } from './Tile'
import { loadFeesAsync, loadPricesAsync } from '../Logic/FeesLogic'

export const Tiles = () => {
    const [coins, setCoins] = useState([]);
    const [prices, setPrices] = useState([]);

    useEffect(() => {
        localLoadFeesAsync();
        localLoadPricesAsync();
    }, []);
    const localLoadFeesAsync = async () => {
        let c = await loadFeesAsync();
        //console.log(c);
        setCoins(x => c);
    }
    const localLoadPricesAsync = async () => {
        let p = await loadPricesAsync();
        //console.log(p);
        setPrices(x => p);
    }

    return (
        <div>
        <table>
        <thead>
            <tr>
                <td>Coin</td>
                <td>Network</td>
                <td>Fee in USD<br />on Crypto.com <Img coin="CRO" /></td>
                <td>Fee in USD<br />on Huobi <Img coin="HT" /></td>
            </tr>
            <tr><td colSpan={4}><hr /></td></tr>
        </thead>
        <tbody>
            { (coins && prices && coins.length > 0) &&
                coins.map(x => <Tile key={x.id} {...x} prices={prices} />)
            }
        </tbody>
        </table>
        </div>
    )
}