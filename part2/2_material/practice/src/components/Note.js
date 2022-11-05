const Note = ({note, toggleImportance}) => {
  const label = note.important ? 'to not important': 'to important'
    return(
      <li className="note">
        <button onClick={toggleImportance}>{label}</button> 
        {note.content}
      </li>
    )
}

export default Note