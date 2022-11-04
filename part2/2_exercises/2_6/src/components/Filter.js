const Filter = ({val, change}) => {
    return (
        <div>
        filter names with: <input value={val} onChange={change}/>
        </div>
    )
}

export default Filter