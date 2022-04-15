import { useState, useEffect } from 'react'
import { getBridges } from '../Logic/BridgeLogic'
import { CoinImage, Img } from './Tile';
import { ItemList } from './ItemList';
import { Table } from './Table';

import ExternalLink from '../Images/external_link.png'

export const Bridges = () => {
    const [bridges, setBridges] = useState([]);

    useEffect(() => {
        const b = getBridges();
        setBridges(x => b);
    }, []);

    return (
        <div className="wrap">
            <Bridge {...bridges[0]} />
            <div>
                <Bridge {...bridges[1]} />
                <Bridge {...bridges[2]} />
            </div>
        </div>
    )
}
const Bridge = (props) => {
    const { name, coins, link, usedCoins } = props;

    const superheader = <><a href={link} target="new">{name}<img className="gap bottom" height={18} src={ExternalLink} alt='external link' /></a><br />
        { usedCoins && usedCoins.length > 0 &&
                    <div className="flex">coins:&nbsp;{<ItemList items={usedCoins.map(x => <Img key={x} coin={x} />)} />}</div>
        }
        </>;
    const headers = [<>source network</>,<>destination network</>];
    const rows = coins && coins.map(x => [<CoinImage coin={x.fromCoin} />, <CoinImage coin={x.toCoin} />]);
    return (
        <Table headers={headers} rows={rows} width={280} superheader={superheader} />
    )
}