
export const ItemList = (props) => {
    const { items } = props;
    
    return (<div>
        { items && items.length > 0 && 
            items.map((x, i) => <>{x}{i < items.length - 1 ? "," : ""}</>)
        }
    </div>)
}