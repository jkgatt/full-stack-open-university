const Filter = (props) => {
    return (
        <div>
            Filter People:<input value={props.filter} onChange={props.filterChangeEvent}></input>
        </div>
    )
}

export default Filter