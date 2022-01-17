import { useState, useEffect } from 'react'
import { getBridges } from '../Logic/BridgeLogic'
import { CoinImage, Img } from './Tile';
import { ItemList } from './ItemList';

import ExternalLink from '../Images/external_link2.png'

export const Bridges = () => {
    const [bridges, setBridges] = useState([]);

    useEffect(() => {
        const b = getBridges();
        setBridges(x => b);
    }, []);

    return (
        <div>
            { bridges && bridges.length > 0 &&
                bridges.map(x => <Bridge key={x.id} {...x} />)
            }
        </div>
    )
}
const Bridge = (props) => {
    const { name, coins, feeNote, link, usedCoins } = props;

    return (
        <table>
            <thead>
                <tr><th colSpan={2}><a href={link} target="new">{name}<img className="gap bottom" height={18} src={ExternalLink} alt='external link' /></a><br />
                </th></tr>
                { usedCoins && usedCoins.length > 0 &&
                    <tr><td colSpan={2}><div className="flex">coins:&nbsp;{<ItemList items={usedCoins.map(x => <Img key={x} coin={x} />)} />}</div></td></tr>
                }
                <tr><td>source network</td><td>destination network</td></tr>
                <tr><td colSpan={2}><hr /></td></tr>
            </thead>
            <tbody>
                {coins.map(x => <tr key={x.id} className="hoverable">
                    <td>{<CoinImage coin={x.fromCoin} />}</td>
                    <td>{<CoinImage coin={x.toCoin} />}</td>
                </tr>)}
            </tbody>
            <tfoot>
                <tr><td colSpan={2}><hr /><hr /></td></tr>
            </tfoot>
        </table>
    )
}