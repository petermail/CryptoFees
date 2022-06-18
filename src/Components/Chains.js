import { getChains } from "../Logic/ChainLogic"
import { getScansToken, USDC, USDD, USDT, USN, UST } from "../Logic/ConstLogic";
import { Table } from "./Table";
import { CoinImage } from "./Tile";

import CopyImg from "../Images/copy.png";

export const Chains = () => {
    const chains = getChains();

    const copy = async (text) => {
        await navigator.clipboard.writeText(text);
    }

    const coins = [USDC, USDT, USDD, USN, UST];
    return (<div>
        {coins.map(coin => {
            const superheader = <div><CoinImage coin={coin} /></div>;
            const headers = ["network", "address"];
            if (coin === UST) { headers.push("bridge"); }
            const rows = chains.filter(x => x.coin === coin).map(x => { 
                const url = getScansToken(x.chain, x.address);
                return [<div key={x.chain}><CoinImage coin={x.chain} /></div>, <>{ url ? <div><a href={url} target="new">{x.address}</a> <img className="hand" onClick={() => copy(x.address)} src={CopyImg} alt="copy" width={20} /></div> : <>{x.address}</>}</>, x.bridge]; 
            });
            return (<Table key={coin} superheader={superheader} headers={headers} rows={rows} width={610}></Table>);
        })}
    </div>
    );
}