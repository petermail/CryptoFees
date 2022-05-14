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
    const xmrPrice = useRef(0);
    const croPrice = useRef(0);
    const canResetTime = useRef(false);
    const timer = setTimeout(() => {
        calculateTime();
    }, 1000);;

    useEffect(() => {
        localLoadPricesAsync();
    }, []);
    const localLoadGasAsync = async () => {
        setCanReload(x => false);
        canResetTime.current = true;
        loadGasAsync(g => {
            updateChainPrice(g, 'ETH', ethPrice.current);
            updateChainPrice(g, 'Arbitrum', ethPrice.current);
            updateChainPrice(g, 'XMR', xmrPrice.current);
            updateChainPrice(g, 'LUNA', 1000/65);
            updateChainPrice(g, 'CRO', croPrice.current);
            //console.log(g);
            setGas(x => g);
            if (canResetTime.current) {
                setReloadTime(x => new Date());
            }
        }, () => {
            setCanReload(x => true);
            canResetTime.current = false;
        });
    }
    const updateChainPrice = (gases, chain, price) => {
        const gas = gases.filter(x => x.chain === chain)[0];
        if(gas){
            gas.price = price;
        }
    }
    const localLoadPricesAsync = async () => {
        let p = await loadPricesAsync();
        //console.log(p);
        setPrices(x => p);
        let e = p.filter(x => x.coin === 'ETH')[0].price;
        ethPrice.current = e;
        const xmrConst = 1000 / 65000; // Adjust price for further calculations
        xmrPrice.current = p.filter(x => x.coin === 'XMR')[0].price * xmrConst;
        croPrice.current = p.filter(x => x.coin === 'CRO')[0].price;
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
            { (gas === null || gas.length === 0) &&
                <tr><td colSpan={2}><div>Loading data...</div></td></tr>
            }
        </tbody>
        </table>
        </div>
    );
}