import { BrowserRouter, Routes, Route, NavLink, Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Tiles } from './Tiles'
import { TilesGas } from './TilesGas'
import { Bridges } from './Bridges'
import { Pools } from './Pools'

import '../Css/Main.css';

export const Main = () => {

    return (
        <div className="body">
            <Header />
            <BrowserRouter>
                <Routes>
                    <Route element={<MainMenu />}>
                        <Route index element={<Tiles />} />
                        <Route path="/chain" element={<TilesGas />} />
                        <Route path="/bridge" element={<Bridges />} />
                        <Route path="/pool" element={<Pools />} />
                    </Route>
                </Routes>
            </BrowserRouter>
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
            </ul>
        </nav>

        <Outlet />
    </div>)
}