import { useState, useEffect, useRef } from 'react'
import Notification from './components/Notification'
import Note from './components/Note'
import noteService from './services/notes'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'

const App = () => {
  const [notes, setNotes] = useState([])
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // reference for note form
  const noteFormRef = useRef()

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
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(alteredNote => {
        setNotes(notes.map(n => n.id !== id ? n: alteredNote))
      })
      .catch(error => {
        console.log(error)
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
  const addNote = (noteObj) => {
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObj)
      .then(addedNote => {
        setNotes(notes.concat(addedNote))
      })
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

  // form handlers login and create note

  const loginForm = () => {
    return (
      <Togglable type={'mainBtn two'} buttonLabel='login'>
        <LoginForm
          handleSubmit={handleLogin}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          username={username}
          password={password}
        />
      </Togglable>
    )
  }

  const noteForm = () => (
    <Togglable type={'mainBtn two'} buttonLabel={'new note'} ref={noteFormRef}>
      <NoteForm
        createNote={addNote}
      />
    </Togglable>
  )

  return (
    <div>
      <h1>Notes</h1>

      {errorMessage && <Notification message={errorMessage} />}
      {
        user === null ?
          loginForm() :
          <div>
            <p className="userName">{user.name} logged-in</p>
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