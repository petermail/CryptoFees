import { useState, useEffect } from "react"
import { getPoolsAsync } from "../Logic/PoolLogic"
import { CoinImage } from "./Tile";

export const Pools = () => {
    const [pools, setPools] = useState([]);

    useEffect(() => {
        localGetPools();
    }, []);

    const localGetPools = async () => {
        const p = await getPoolsAsync();
        setPools(x => p);
    }

    return (
        <div>
            <div><a href="https://autofarm.network" target="new">Autofarm</a></div>
            { pools && pools.length > 0 && 
                pools.map(x => <ChainPool key={x.chain} chain={x.chain} pools={x.pools} />)
            }
            { (pools === undefined || pools.length === 0) &&
                <div>Loading data...</div>
            }
        </div>
    )
}

export const ChainPool = (props) => {
    const { chain, pools } = props;

    return (
        <div>
            <div className="flex">
                Network:&nbsp;<CoinImage coin={chain} />
            </div>
            <hr />
            { pools && pools.length > 0 && 
                pools.map(x => <Pool key={x.id} {...x} />)
            }
            <hr />
            <hr />
        </div>
    )
}

export const Pool = (props) => {
    const { pool, apy } = props;

    return (
        <div className="flex">
            <CoinImage coin={pool} /> {Math.round(apy * 1000) / 10}%
        </div>
    )
}