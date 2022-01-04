import { Header } from './Header'
import { Tiles } from './Tiles'

import '../Css/Main.css';

export const Main = () => {

    return (
        <div>
            <Header />
            <div className="body">
                <Tiles />
            </div>
        </div>
    )
}