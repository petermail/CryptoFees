import styled from 'styled-components';

const StyledTable = styled.table`
    margin: 5px;
    padding: 5px;
    background-color: #40444d;
    width: ${({width}) => width} px;
`;

export const Table = (props) => {
    const { headers, rows, width, superheader } = props;

    return (
        <StyledTable width={width}>
            <thead>
                { superheader && headers &&
                    <tr><th colSpan={headers.length}>{superheader}</th></tr>
                }
                <tr>
                    {headers && headers.map((x, i) => <td key={i}>{x}</td>)}
                </tr>
                <tr><td colSpan={headers.length}><hr /></td></tr>
            </thead>
            <tbody>
                { rows && rows.map((xs, xi) => (<tr key={xi} className="hoverable">{xs.map((x, i) => (<td key={i}>{x}</td>))}</tr>))
                }
            </tbody>
        </StyledTable>
    );
}