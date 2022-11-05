const Note = ({note, toggleImportance}) => {
  const label = note.important ? 'to not important': 'to important'
    return(
      <li>
        {note.content}
        <p><button onClick={toggleImportance}>{label}</button> </p> 
      </li>
    )
}

export default Note