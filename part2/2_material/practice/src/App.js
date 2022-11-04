import { useState } from "react"
import Note from "./components/Note"

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note...')
  const [showAll, setShowAll] = useState(true)

  // checks if showAll is true, if yes then all notes shown, otherwise only important
  const notesToShow = showAll ? notes: notes.filter(note => note.important)
  console.log(notesToShow)
  const addNote = (event) => {
    event.preventDefault()
    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    }
    setNotes(notes.concat(noteObj))
    setNewNote('')
    console.log('button clicked', event.target)
  }

  const handleNote = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNote}/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App