const PersonForm = ({val, change, label}) => {
    return (
        <>
            <div> {label}: <input value={val} onChange={change}/> </div>
        </>
    )
}

export default PersonForm