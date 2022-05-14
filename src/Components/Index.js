import { NavLink } from "react-router-dom"
import { ATOM, AURORA, AVAX, BNB, BUSD, CRO, DAI, ETH, FRAX, FTM, GLMR, HT, LUNA, MATIC, MIM, MOVR, NEAR, OSMO, RUNE, SCRT, SOL, USDC, USDT, UST } from "../Logic/ConstLogic"
import { Img } from "./Tile"

export const Index = () => {

    return (
        <div>
            Let's join multichain world. There are a lot of EVM compatible blockchains with much lower fees than <Img coin={ETH} /> Ethereum like these blockchains {[BNB, AVAX, FTM, MATIC, CRO, HT, AURORA, MOVR, GLMR, ].map(x => <Img key={x} coin={x} />)}.
            <br />
            There is also rich universe of blockchains in <Img coin={ATOM} /> Cosmos ecosystem with chains {[LUNA, RUNE, OSMO, SCRT, ].map(x => <Img key={x} coin={x} />)} connected by IBC protocol.
            <br />
            There are lot of places to get <NavLink to="/pool">best yield</NavLink>, be it almost 20% on <Img coin={"ANC"} /> Anchor protocol or auto-compounding farming protocols <Img coin={"AUTO"} /> Autofarm or <Img coin={"BIFI"} /> Beefy Finance which allow high APRs on <NavLink to="/stablecoins">stablecoins</NavLink> LPs {[USDT, USDC, UST, BUSD, DAI, FRAX, MIM, ].map(x => <Img key={x} coin={x} />)}.
            <br />
            All blockchains are (or will be) connected by <NavLink to="/bridge">bridges</NavLink> like Multichain (especially for EVM chains), Wormhole bridge connecting <Img coin={SOL} /> Solana with multiple other chains, Rainbow bridge specializing at <Img coin={NEAR} /> Near ecosystem and other bridges are connecting the crypto universe.
            <br />
            Do you look for best decentralized exchange, you have a lot of choices on each chains. You might want to try one of those DEXes: {["CAKE", OSMO, "SUSHI", "SEFI", RUNE, "ORCA", "BOO", "JOE", "ASTRO", "MMF", "VVS", "BSW" ].map(x => <Img key={x} coin={x} />)}
            <br />
            Are you trying to verify you have correct smart contract address of the stablecoin you want to use? Look at the addresses at the <NavLink to="chain-data">chain</NavLink> list.
            <hr />
            Do you want to withdraw crypto from an exchange the cheapest way possible? Look at dollar <NavLink to="/withdraw">withdraw fees</NavLink> on Crypto.com and Huobi. For example withdrawing USDT on Solana is much cheaper than withdrawing USDT on Ethereum. <br />
            <img src="menu_1.png" alt="menu" height={30} />
            <br />
            <img src="withdraw_fees.png" alt="USDT historical withdraw fees on Crypto.com and Huobi" />
            <br />
            <hr />
            Do you want to use blockchain right now? Then you will be interested in current <NavLink to="/chain">gas fees</NavLink> on many of the possible blockchains.<br />
            <img src="menu_2.png" alt="menu" height={30} />
            <br />
            <img src="gas_fees.png" alt="Gas fees on blockchains" />
            <br />
            If you want to find best <NavLink to="/pool">APR yield</NavLink> on your stablecoins, Bitcoin or Ethereum, look at the pools on Autofarm or Beefy Finance.
            <br />
            <img src="menu_4.png" alt="menu" height={30} />
            <br />
            <img src="pools.png" alt="Pools on Befee Finance" />
        </div>)
}