import { BrowserRouter, Routes, Route, NavLink, Outlet, HashRouter } from 'react-router-dom'
import { Header } from './Header'
import { Tiles } from './Tiles'
import { TilesGas } from './TilesGas'
import { Bridges } from './Bridges'
import { Pools } from './Pools'
import { Inflation } from './Inflation'
import { TokenAmounts } from './TokenAmounts'
import { Links } from './Links'

import '../Css/Main.css';
import { Chains } from './Chains'
import { Index } from './Index'
import { Starter } from './Starter'

export const Main = () => {

    return (
        <div className="body">
            <Header />
            <HashRouter basename='/'>
                <Routes>
                    <Route element={<MainMenu />}>
                        <Route index element={<Index />} />
                        <Route path="/withdraw" element={<Tiles />} />
                        <Route path="/chain" element={<TilesGas />} />
                        <Route path="/gas" element={<TilesGas />} />
                        <Route path="/bridge" element={<Bridges />} />
                        <Route path="/pool" element={<Pools />} />
                        <Route path="/yield" element={<Pools />} />
                        <Route path="/stablecoins" element={<TokenAmounts />} />
                        <Route path="/inflation" element={<Inflation />} />
                        <Route path="/chain-data" element={<Chains />} />
                        <Route path="/links" element={<Links />} />
                        <Route path="/faucet" element={<Starter />} />
                    </Route>



                </Routes>
            </HashRouter>
        </div>
    )
}

export const MainMenu = () => {

    return (<div>
        <nav>
            <ul className="menu flex wrap">
                <li>
                    <NavLink to="/withdraw">Withdraw fees</NavLink>
                </li>
                <li>
                    <NavLink to="/gas">Blockchain fees</NavLink>
                </li>
                <li>
                    <NavLink to="/yield">Yield</NavLink>
                </li>
                <li>
                    <NavLink to="/stablecoins">Stablecoins</NavLink>
                </li>
                <li>
                    <NavLink to="/inflation">Inflation</NavLink>
                </li>
                <li>
                    <NavLink to="/bridge">Bridges</NavLink>
                </li>
                <li>
                    <NavLink to="/chain-data">Chain</NavLink>
                </li>
                <li>
                    <NavLink to="/links">Links</NavLink>
                </li>
            </ul>
        </nav>

        <Outlet />
    </div>)
}