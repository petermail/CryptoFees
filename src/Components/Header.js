import { Img } from "./Tile"

export const Header = () => {

    return (<div className="header">
        <div className="flex">
            <Img coin="CryptoFees" />
            <div className="gap">
                <a href="http://www.cryptofees.online">CryptoFees.online</a>
            </div>
        </div>
    </div>)
}