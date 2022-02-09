
export const ItemList = (props) => {
    const { items } = props;
    
    return (<div>
        { items && items.length > 0 && 
            items.map((x, i) => <span key={i}>{x}{i < items.length - 1 ? "," : ""}</span>)
        }
    </div>)
}