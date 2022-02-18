import { BrowserRouter, Routes, Route, NavLink, Outlet, HashRouter } from 'react-router-dom'
import { Header } from './Header'
import { Tiles } from './Tiles'
import { TilesGas } from './TilesGas'
import { Bridges } from './Bridges'
import { Pools } from './Pools'
import { Inflation } from './Inflation'
import { TokenAmounts } from './TokenAmounts'

import '../Css/Main.css';

export const Main = () => {

    return (
        <div className="body">
            <Header />
            <HashRouter basename='/'>
                <Routes>
                    <Route element={<MainMenu />}>
                        <Route index element={<Tiles />} />
                        <Route path="/chain" element={<TilesGas />} />
                        <Route path="/bridge" element={<Bridges />} />
                        <Route path="/pool" element={<Pools />} />
                        <Route path="/stablecoins" element={<TokenAmounts />} />
                        <Route path="/inflation" element={<Inflation />} />
                    </Route>
                </Routes>
            </HashRouter>
        </div>
    )
}

export const MainMenu = () => {

    return (<div>
        <nav>
            <ul className="menu flex">
                <li>
                    <NavLink to="/">Withdraw fees</NavLink>
                </li>
                <li>
                    <NavLink to="/chain">Blockchain fees</NavLink>
                </li>
                <li>
                    <NavLink to="/bridge">Bridges</NavLink>
                </li>
                <li>
                    <NavLink to="/pool">Pools</NavLink>
                </li>
                <li>
                    <NavLink to="/stablecoins">Stablecoins</NavLink>
                </li>
                <li>
                    <NavLink to="/inflation">Inflation</NavLink>
                </li>
            </ul>
        </nav>

        <Outlet />
    </div>)
}