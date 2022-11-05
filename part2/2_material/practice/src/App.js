import { useState, useEffect } from "react"
import Notification from "./components/Notification"
import Note from "./components/Note"
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  // useEffect hook

  const hook = () => {
    noteService
      .getAll()
      .then(initialNote => {
        setNotes(initialNote)
      })
  }
  
  useEffect(hook, [])

  // check note importance
  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(alteredNote => {
        setNotes(notes.map(n => n.id !== id ? n: alteredNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  // checks if showAll is true, if yes then all notes shown, otherwise only important
  const notesToShow = showAll ? notes: notes.filter(note => note.important)

  // add a new instance
  const addNote = (event) => {
    event.preventDefault()
    const noteObj = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObj)
      .then(addedNote => {
        setNotes(notes.concat(addedNote))
        setNewNote('')
      })
    // axios
    //   .post('http://localhost:3001/notes', noteObj)
    //   .then(response => {
    //     console.log(response)
    //     setNotes(notes.concat(response.data))
    //     setNewNote('')
    //   })
    // setNotes(notes.concat(noteObj))
    // setNewNote('')
    // console.log('button clicked', event.target)
  }

  const handleNote = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      {errorMessage && <Notification message={errorMessage} />}
      <div>
        <button className="mainBtn" onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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