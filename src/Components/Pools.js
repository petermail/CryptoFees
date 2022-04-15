import { useState, useEffect } from "react"
import { getPoolsAsync } from "../Logic/PoolLogic"
import { CoinImage } from "./Tile";
import { Table } from './Table';

import ExternalLink from '../Images/external_link2.png'

export const Pools = () => {
    const services = [{ url: "https://autofarm.network", title: "Autofarm" }, 
        {url: "https://app.beefy.com/#/", title: "Beefy"}];
    //const [pools, setPools] = useState([]);
    const [autoPool, setAutoPool] = useState([]);
    const [beefyPool, setBeefyPool] = useState([]);

    useEffect(() => {
        localGetPools();
    }, []);

    const localGetPools = async () => {
        getPoolsAsync(p => {
            for (const pool in p) {
                if (p[pool].farm === services[0].title) {
                    setAutoPool(x => p[pool].data)
                } else if (p[pool].farm === services[1].title) {
                    setBeefyPool(x => p[pool].data);
                    //console.log(p[pool].data);
                }
            }
        });
        //setPools(x => p);
    }

    //return (services.map((x, i) => <ServicePool key={x.title} {...x} pools={pools.filter(y => y.farm === x.title)[0]?.data} />));
    return (<>
        <ServicePool title={services[0].title} url={services[0].url} pools={autoPool} />
        <ServicePool title={services[1].title} url={services[1].url} pools={beefyPool} />
    </>)
}
const ServicePool = (props) => {
    const { url, title, pools } = props;

    return (
        <div>
            <div>
                <h3>
                <a href={url} target="new">{title}<img className="gap bottom" height={18} src={ExternalLink} alt='external link' /></a>
                </h3>
            </div>
            <div className="wrap">
            { pools && pools.length > 0 && 
                pools.map(x => <ChainPool key={title + x.chain} chain={x.chain} pools={x.pools} />)
            }
            { (pools === undefined || pools.length === 0) &&
                <div>Loading data...</div>
            }
            </div>
        </div>
    )
}

export const ChainPool = (props) => {
    const { chain, pools } = props;

    const headers = [<div className="flex">Network&nbsp;<CoinImage coin={chain} /></div>];
    const rows = pools ? pools.map(x => [<Pool key={x.id} {...x} />]) : [];

    return <Table key={chain} headers={headers} rows={rows} width={280} />
}

export const Pool = (props) => {
    const { pool, apy, url } = props;

    return (
        <div className="flex">
            <CoinImage coin={pool} /> {Math.round(apy * 1000) / 10}%
            { url && <a href={url} target="new"><img className="gap bottom" height={18} src={ExternalLink} alt='external link' /></a>}
        </div>
    )
}