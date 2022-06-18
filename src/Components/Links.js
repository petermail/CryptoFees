import { Table } from './Table';
import { CoinImage, Img } from './Tile';

import ExternalLink from '../Images/external_link.png'
import { BNB, LUNA, SCRT, FTM, CRO, SOL, AVAX, ETH, MATIC, OSMO, RUNE, AURORA, NEAR, GLMR, MOVR, HT, ALGO, TRX } from '../Logic/ConstLogic';

export const Links = () => {

    const headersFarm = [<h3>finance</h3>];
    const rowsFarm = [[<Link key={1} coin="ANC" href="https://app.anchorprotocol.com/" coins={[LUNA, AVAX]} title="Anchor protocol" />],
        [<Link key={2} coin="AUTO" href="https://autofarm.network" title="Autofarm" />],
        [<Link key={3} coin="BIFI" href="https://app.beefy.com/#/" title="Beefy" />],
        [<Link key={4} href="https://app.hector.finance/#/farming" coins={[FTM]} title="Hector Finance" />],
    ];
    const rowsBridge = [[<Link key={11} href="https://bridge.terra.money/" coins={[LUNA]} title="Terra" />],
        [<Link key={12} href="https://bridge.scrt.network/" coins={[SCRT]} title="Secret Network" />],
        [<Link key={13} href="https://wrap.scrt.network/" coins={[SCRT]} title="Secret Wrap" />],
        [<Link key={14} coin="MULTI" href="https://app.multichain.org/#/router" title="Multichain" />],
        [<Link key={15} coin="STG" href="https://stargate.finance/transfer" title="Stargate" />],
        [<Link key={16} coin="CELR" href="https://cbridge.celer.network/#/transfer" title="CBridge" />],
        [<Link key={17} coin={OSMO} href="https://app.osmosis.zone/assets" coins={[OSMO]} title="Osmosis" />],
        [<Link key={18} href="https://satellite.axelar.network" title="Satellite" />],
        [<Link key={19} href="https://synapseprotocol.com/" title="Synapse Bridge" />],
        [<Link key={111} href="https://app.rubic.exchange/" title="Rubic" />],
        [<Link key={112} href="https://rainbowbridge.app/transfer" coins={[NEAR, AURORA, ETH]} title="Rainbow Bridge" />],
    ];
    const rowsSwap = [[<Link key={20} coin="CAKE" href="https://pancakeswap.finance/swap" coins={[BNB]} title="PancakeSwap" />],
        [<Link key={21} coin={OSMO} href="https://app.osmosis.zone/" coins={[OSMO]} title="Osmosis" />],
        [<Link key={22} coin="SUSHI" href="https://app.sushi.com/en/swap" title="Sushi" />],
        [<Link key={23} coin="SEFI" href="https://app.secretswap.net/swap" coins={[SCRT]} title="Secret Swap" />],
        [<Link key={24} coin={RUNE} href="https://app.thorswap.finance/" coins={[RUNE]} title="THORSwap" />],
        [<Link key={25} coin="ORCA" href="https://www.orca.so/" coins={[SOL]} title="Orca" />],
        [<Link key={26} coin="BOO" href="https://spookyswap.finance/swap" coins={[FTM]} title="SpookySwap" />],
        [<Link key={27} coin="JOE" href="https://traderjoexyz.com/trade" coins={[AVAX]} title="Trader Joe" />],
        [<Link key={28} coin="ASTRO" href="https://app.astroport.fi/swap" coins={[LUNA]} title="Astroport" />],
        [<Link key={29} coin="MMF" href="https://mm.finance/swap" coins={[CRO]} title="MM Finance" />],
        [<Link key={30} coin="VVS" href="https://vvs.finance/swap" coins={[CRO]} title="VVS Finance" />],
        [<Link key={31} coin="BSW" href="https://exchange.biswap.org" coins={[BNB]} title="Biswap" />],
        [<Link key={33} href="https://app.ref.finance" coins={[NEAR]} title="Ref.finance" />],
        [<Link key={34} href="https://app.algofi.org/swap" coins={[ALGO]} title="Algofi" />],
        [<Link key={35} href="https://sun.io" coins={[TRX]} title="SUN" />],
        [<Link key={32} href="https://app.acryptos.com/stableswap/" coins={[BNB]} title="ACryptoS stable" />],
    ];
    const rowsLend = [[<Link key={40} coin="TULIP" href="https://tulip.garden/lend" coins={[SOL]} title="Tulip" />],
        [<Link key={41} coin="AAVE" href="https://app.aave.com/" coins={[ETH, MATIC, AVAX, FTM]} title="Aave" />],
        [<Link key={42} coin="ALPACA" href="https://app.alpacafinance.org/lend" coins={[BNB, FTM]} title="Alpaca Finance" />],
        [<Link key={43} href="https://solend.fi/dashboard" coins={[SOL]} title="Solend" />],
        [<Link key={44} href="https://app.edgeprotocol.io/pool" coins={[LUNA]} title="Edge Protocol" />],
        [<Link key={45} href="https://app.venus.io/dashboard" coins={[BNB]} title="Venus Protocol" />],
        [<Link key={46} href="https://app.tectonic.finance/markets/" coins={[CRO]} title="Tectonic" />],
        [<Link key={47} href="https://app.aurigami.finance/" coins={[AURORA]} title="Aurigami" />],
        [<Link keh={48} href="https://app.sienna.network/lend/deposit" coins={[SCRT]} title="Sienna" />],
        [<Link key={49} href="https://app.burrow.cash/#/deposit" coins={[NEAR]} title="Burrow" />],
        [<Link keh={140} href="https://justlend.org/#/market" coins={[TRX]} title="JustLend" />],
    ];
    const rowsOther = [[<Link href="https://gmx.io/trade" coins={[AVAX]} title="GMX" />],
        [<Link href="https://app.friktion.fi/" coins={[SOL]} title="Friktion" />],
        [<Link href="https://francium.io/app/strategies/farming" coins={[SOL]} title="Francium" />],
        [<Link href="https://app.lyra.finance" coins={[ETH]} title="Lyra" />],
        [<Link href="https://app.ribbon.finance/" coins={[SOL]} title="Ribbon" />],
        [<Link href="https://v2.compli.fi/trade" coins={[MATIC]} title="CompliFi" />],
    ];
    const rowsStablecoins = [[<Link href="https://www.hedge.so/borrow" coins={[SOL]} title="Hedge" />],
        [<Link href="https://app.hubbleprotocol.io/stats" coins={[SOL]} title="Hubble" />]
    ];
    const width = 240;
    return (
        <div>
            <div className="wrap">
                <Table headers={[<h3>swap</h3>]} rows={rowsSwap} width={width} />
                <Table headers={[<h3>bridge</h3>]} rows={rowsBridge} width={width} />
                <Table headers={[<h3>lending</h3>]} rows={rowsLend} width={width} />
                <Table headers={headersFarm} rows={rowsFarm} width={width} />
                <Table headers={[<h3>other</h3>]} rows={rowsOther} width={width} />
                <Table headers={[<h3>small stablecoins</h3>]} rows={rowsStablecoins} width={width} />
            </div>
            <br />
            <p>
            Do you try to add new network to Metamask? Metamask supports chains, that are EVM compatible like these: 
            {[ETH, BNB, AVAX, FTM, CRO, MATIC, HT, AURORA, MOVR, GLMR, ].map(x => <Img key={x} coin={x} />)} You will be able to connect your Metamask wallet and add it from <Link href="https://chainlist.org/" title="chainlist" />
            </p>
            <p>
                If you are interested in latest fees for transfers on Bitcoin, Bitcoin Cache, Ethereum, Litecoin or Doge, look at this great site: <Link href="https://cryptofees.net" title="cryptofees.net" />
            </p>
            <p>
                If you are looking for more exotic chains and their gas fees, look at <Link href="https://cointool.app/gasPrice/eth" title="cointool" />
            </p>
            <p>
                Other interesting resources: <Link href="https://terra.smartstake.io/anc" title="Anchor protocol yield reserve" /> or more <Link href="https://grafana.luigi311.com/d/7j96rRI7z/anchor?orgId=2&from=now-90d&to=now" title="Anchor analytics" />
            </p>
            <p>
                For <Img coin={"TRX"} /> Tron users might be useful <Link href="https://www.tronstation.io/calculator" title="this calculator" /> for energy and bandwith staking required for your transaction if you try to optimize gas use. Look at <Link href="https://tronscan.io/#/transaction/67e619c7476d3af05f471a3cd7aeeeccba85fa505b513ae377fc128f887a305a" title="Tronscan transactions" /> for similar transaction and their usage of resources.
            </p>
            <p>
                Contact us on <Link href="https://discord.gg/ZKdFNTFc" title="Discord" coin="discord" />
            </p>
        </div>
    )
}

export const ExtLink = (props) => {
    return <Link {...props} />
}

const Link = ({ href, title, coins, coin }) => {
    return <a href= {href} target="new">
        {coin ? <Img key={coin} coin={coin} /> : <></>} {title} { coins && coins.map(x => <Img key={x} coin={x} />) }<External />
    </a>;
}

const External = () => {
    return <img className="gap bottom" height={18} src={ExternalLink} alt='external link' />;
}