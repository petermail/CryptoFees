import { Table } from './Table';
import { CoinImage, Img } from './Tile';

import ExternalLink from '../Images/external_link.png'
import { BNB, LUNA, SCRT, FTM, CRO, SOL, AVAX, ETH, MATIC, OSMO, RUNE } from '../Logic/ConstLogic';

export const Links = () => {

    const headersFarm = [<h3>finance</h3>];
    const rowsFarm = [[<Link key={1} coin="ANC" href="https://app.anchorprotocol.com/" coins={[LUNA, AVAX]} title="Anchor protocol" />],
        [<Link key={2} coin="AUTO" href="https://autofarm.network" title="Autofarm" />],
        [<Link key={3} coin="BIFI" href="https://app.beefy.com/#/" title="Beefy" />],
        [<Link key={4} href="https://app.hector.finance/#/farming" coins={[FTM]} title="Hector Finance" />],
        [<Link key={5} href="https://soluna.money/#/stake" coins={[SOL]} title="Soluna" />],
    ];
    const rowsBridge = [[<Link key={11} href="https://bridge.terra.money/" coins={[LUNA]} title="Terra" />],
        [<Link key={12} href="https://bridge.scrt.network/" coins={[SCRT]} title="Secret Network" />],
        [<Link key={13} href="https://wrap.scrt.network/" coins={[SCRT]} title="Secret Wrap" />],
        [<Link key={14} coin="MULTI" href="https://app.multichain.org/#/router" title="Multichain" />],
        [<Link key={15} coin="STG" href="https://stargate.finance/transfer" title="Stargate" />],
        [<Link key={16} coin="CELR" href="https://cbridge.celer.network/#/transfer" title="CBridge" />],
        [<Link key={17} coin={OSMO} href="https://app.osmosis.zone/assets" coins={[OSMO]} title="Osmosis" />],
        [<Link key={18} href="https://satellite.axelar.network" title="Satellite" />]
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
        [<Link key={32} href="https://app.acryptos.com/stableswap/" coins={[BNB]} title="ACryptoS stable" />]];
    const rowsLend = [[<Link key={40} coin="TULIP" href="https://tulip.garden/lend" coins={[SOL]} title="Tulip" />],
        [<Link key={41} coin="AAVE" href="https://app.aave.com/" coins={[ETH, MATIC, AVAX, FTM]} title="Aave" />],
        [<Link key={42} coin="ALPACA" href="https://app.alpacafinance.org/lend" coins={[BNB, FTM]} title="Alpaca Finance" />],
        [<Link key={43} href="https://solend.fi/dashboard" coins={[SOL]} title="Solend" />],
        [<Link key={44} href="https://app.edgeprotocol.io/pool" coins={[LUNA]} title="Edge Protocol" />],
        [<Link key={45} href="https://app.venus.io/dashboard" coins={[BNB]} title="Venus Protocol" />],
        [<Link key={46} href="https://app.tectonic.finance/markets/" coins={[CRO]} title="Tectonic" />]];
    const rowsMargin = [[<Link href="https://gmx.io/trade" coins={[AVAX]} title="GMX" />]];
    const width = 240;
    return (
        <div>
            <div className="wrap">
                <Table headers={headersFarm} rows={rowsFarm} width={width} />
                <Table headers={[<h3>bridge</h3>]} rows={rowsBridge} width={width} />
                <Table headers={[<h3>swap</h3>]} rows={rowsSwap} width={width} />
                <Table headers={[<h3>lending</h3>]} rows={rowsLend} width={width} />
                <Table headers={[<h3>margin trading</h3>]} rows={rowsMargin} width={width} />
            </div>
        </div>
    )
}

const Link = ({ href, title, coins, coin }) => {
    return <a href= {href} target="new">
        {coin ? <Img coin={coin} /> : <></>} {title} { coins && coins.map(x => <Img key={x} coin={x} />) }<External />
    </a>;
}

const External = () => {
    return <img className="gap bottom" height={18} src={ExternalLink} alt='external link' />;
}