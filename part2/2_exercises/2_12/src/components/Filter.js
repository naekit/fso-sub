const Filter = ({val, change}) => {
    return (
        <div>
        find country: <input value={val} onChange={change}/>
        </div>
    )
}

export default Filter