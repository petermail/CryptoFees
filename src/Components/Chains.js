import { getChains } from "../Logic/ChainLogic"
import { getScansToken, USDC, USDT, UST } from "../Logic/ConstLogic";
import { Table } from "./Table";
import { CoinImage } from "./Tile";

export const Chains = () => {
    const chains = getChains();

    const coins = [USDC, USDT, UST];
    return (<div>
        {coins.map(coin => {
            const superheader = <div><CoinImage coin={coin} /></div>;
            const headers = ["network", "address"];
            if (coin === UST) { headers.push("bridge"); }
            const rows = chains.filter(x => x.coin === coin).map(x => { 
                const url = getScansToken(x.chain, x.address);
                return [<div key={x.chain}><CoinImage coin={x.chain} /></div>, <>{ url ? <a href={url} target="new">{x.address}</a> : <>{x.address}</>}</>, x.bridge]; 
            });
            return (<Table key={coin} superheader={superheader} headers={headers} rows={rows} width={520}></Table>);
        })}
    </div>
    );
}