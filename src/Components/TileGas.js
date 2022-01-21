import { CoinImage } from './Tile'

export const TileGas = (props) => {
    const { chain, gas, price, gasSafe, gasFast } = props;
    const TOKEN_TRANSFER = 65000;
    const DIVIDER = 1000000000;

    return (
        <tr className="hoverable">
            <td><CoinImage coin={chain} /></td>
            <td><GasPrices {...props} /></td>
            <td>{<TransferPrices price={price} gas={gas} gasSafe={gasSafe} gasFast={gasFast} TOKEN_TRANSFER={TOKEN_TRANSFER} DIVIDER={DIVIDER} />}</td>
        </tr>
    );
}

const GasPrices = (props) => {
    const { gas, gasSafe, gasFast, gasUnit } = props;

    return (
        <table>
            <tbody>
                <tr className="smallFont">
                    <td>slow</td>
                    <td>average</td>
                    <td>fast</td>
                </tr>
                <tr>
                    <td className="midPadding good">{gasSafe} <span className="smallFont">{gasUnit}</span></td>
                    <td className="midPadding neutral">{gas} <span className="smallFont">{gasUnit}</span></td>
                    <td className="midPadding bad">{gasFast} <span className="smallFont">{gasUnit}</span></td>
                </tr>
            </tbody>
        </table>
    )
}
const TransferPrices = (props) => {
    const { price, gas, gasSafe, gasFast, TOKEN_TRANSFER, DIVIDER } = props;

    const getGasUsd = (g) => {
        if (g && price) {
            return "$" + Math.round(g * price * TOKEN_TRANSFER * 100 / DIVIDER) / 100;
        }
    }

    return (
        <table>
            <tbody>
                <tr className="smallFont">
                    <td>slow</td>
                    <td>average</td>
                    <td>fast</td>
                </tr>
                <tr>
                    <td className="midPadding good">{getGasUsd(gasSafe)}</td>
                    <td className="midPadding neutral">{getGasUsd(gas)}</td>
                    <td className="midPadding bad">{getGasUsd(gasFast)}</td>
                </tr>
            </tbody>
        </table>
    )
}