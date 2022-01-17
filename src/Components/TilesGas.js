import { useState, useEffect, useRef } from 'react'
import { loadGasAsync } from '../Logic/GasLogic';
import { loadPricesAsync } from '../Logic/FeesLogic';
import { TileGas } from './TileGas';

export const TilesGas = () => {
    const [gas, setGas] = useState([]);
    const [prices, setPrices] = useState([]);
    const [reloadTime, setReloadTime] = useState(new Date());
    const [timeDiff, setTimeDiff] = useState("0 seconds");
    const [canReload, setCanReload] = useState(true);
    const ethPrice = useRef(0);
    const timer = setTimeout(() => {
        calculateTime();
    }, 1000);;

    useEffect(() => {
        localLoadPricesAsync();
    }, []);
    const localLoadGasAsync = async () => {
        setCanReload(x => false);
        let g = await loadGasAsync();
        g.filter(x => x.chain === 'ETH')[0].price = ethPrice.current;
        console.log(g);
        setGas(x => g);
        setReloadTime(x => new Date());
        setCanReload(x => true);
    }
    const localLoadPricesAsync = async () => {
        let p = await loadPricesAsync();
        console.log(p);
        setPrices(x => p);
        let e = p.filter(x => x.coin === 'ETH')[0].price;
        ethPrice.current = e;
        await localLoadGasAsync();
    }

    const calculateTime = () => {
        let d = new Date();
        let diff = Math.round((d - reloadTime) / 1000);
        let textDiff = diff + " seconds";
        if (diff >= 60) {
            const sec = diff % 60;
            const min = Math.floor(diff / 60) % 60;
            const hours = Math.floor(diff / 3600);
            textDiff = `${min} minute${min > 1 ? "s" : ""} ${sec} seconds`;
            if (hours > 0) {
                textDiff = `${hours} hour${hours > 1 ? "s" : ""} ` + textDiff;
            }
        }
        setTimeDiff(x => textDiff);
    }
    const refreshClickHandler = async () => {
        await localLoadGasAsync();
    }

    return (
        <div>
            <div>
                Refreshed {timeDiff} ago 
                &nbsp;<button onClick={() => refreshClickHandler()} disabled={!canReload}>refresh again</button>
            </div>
            <br />
        <table>
        <thead>
            <tr>
                <td>Blockchain</td>
                <td>Gas</td>
                <td>Token transfer in USD</td>
            </tr>
            <tr><td colSpan={4}><hr /></td></tr>
        </thead>
        <tbody>
            { gas &&
                gas.map(x => <TileGas key={x.id} {...x} />)
            }
        </tbody>
        </table>
        </div>
    );
}