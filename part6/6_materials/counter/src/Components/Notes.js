import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
import noteService from "../services/notes";

const Note = ({ note, handleClick }) => {
    return(
        <li onClick={handleClick}>
            {note.content}
            <strong>{note.important ? ' important': ''}</strong>
        </li>
    )
}

const Notes = () => {
    const dispatch = useDispatch()
    const notes = useSelector(({filter, notes}) => {
        if(filter === 'ALL'){
            return notes
        } else if(filter === 'IMPORTANT'){
            return notes.filter(note => note.important)
        } else {
            return notes.filter(note => !note.important)
        }
    })

    const updateNote = async (note) => {
        const addNote = await noteService.updateNote(note)
        dispatch(toggleImportanceOf(addNote))
    }

    return(
        <ul>
            {notes.map(note => 
                <Note
                    key={note.id}
                    note={note}
                    handleClick={
                        () => updateNote(note)
                    }
                />
            )}
        </ul>
    )
}

export default Notes