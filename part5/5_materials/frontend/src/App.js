import { useState, useEffect } from "react"
import Notification from "./components/Notification"
import Note from "./components/Note"
import noteService from './services/notes'
import loginService from './services/login'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  // useEffect hook to get all notes

  const hook = () => {
    noteService
      .getAll()
      .then(initialNote => {
        setNotes(initialNote)
      })
  }
  
  useEffect(hook, [])

  // useEffect hook to check if user token stored in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

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
    setNewNote(event.target.value)
  }

  // updates login info
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      // save user to localStorage
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user))
      // save token for saving notes
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log(user)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // helper functions for generating forms
  const loginForm = () => (
    <form className="login" onSubmit={handleLogin}>
        <div>
            <input 
              type="text"
              placeholder="username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            <input 
              type="password"
              placeholder="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">login</button>
      </form>
  )

  const noteForm = () => (
      <form className="create-note" onSubmit={addNote}>
        <input value={newNote} onChange={handleNote}/>
        <button type="submit">save</button>
      </form>
  )

  return (
    <div>
      <h1>Notes</h1>

      {errorMessage && <Notification message={errorMessage} />}
      {
        user === null ? 
        loginForm(): 
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
        
        }
      

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
    </div>
  )
}

export default App