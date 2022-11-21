import { useEffect } from "react";
import noteService from "./services/notes";
import { setNotes } from "./reducers/noteReducer";
import { useDispatch } from "react-redux";

import FilterForm from "./Components/FilterForm";
import NewNote from "./Components/NewNote";
import Notes from "./Components/Notes";

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    noteService
      .getAll()
      .then(notes => dispatch(setNotes(notes)))
  }, [dispatch])

  return (
    <div>
      <NewNote />
      <FilterForm />
      <Notes />
    </div>
  )
}

export default App

// CODE BEFORE REFACTORING INTO OWN COMPONENTS WITH REDUX STATE
// const App = () => {
//   const dispatch = useDispatch()
//   const notes = useSelector(state => state)

//   const addNote = (event) => {
//     event.preventDefault()
//     const content = event.target.note.value
//     event.target.note.value = ''
//     dispatch(createNote(content))
//   }

//   const toggleImportance = (id) => {
//     dispatch(toggleImportanceOf(id))
//   }

//   return (
//     <div>
//       <form onSubmit={addNote}>
//         <input name="note" />
//         <button type="submit">add</button>
//       </form>
//       <ul>
//         {notes.map(note => 
//           <li 
//             onClick={() => toggleImportance(note.id)}
//             key={note.id}
//             >
//             {note.content} <strong>{note.important ? 'important': ''}</strong>
//           </li>
//           )}
//       </ul>
//     </div>
//   )
// }
// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import noteReducer from './reducers/noteReducer';
// import { createStore } from 'redux'



// const store = createStore(noteReducer)

// const generateId = () => {
//     return Number((Math.random() * 100000000).toFixed(0))
// }

// const createNote = (content) => {
//     return {
//         type: 'NEW_NOTE',
//         data: {
//             content,
//             important: false,
//             id: generateId()
//         }
//     }
// }

// const toggleImportanceOf = (id) => {
//     return {
//         type: 'TOGGLE_IMPORTANCE',
//         data: { id }
//     }
// }

// const App = () => {
//     const addNote = (event) => {
//         event.preventDefault()
//         const content = event.target.note.value
//         event.target.note.value = ''
//         store.dispatch(createNote(content))
//     }

//     const toggleImportance = (id) => {
//         store.dispatch(toggleImportanceOf(id))
//     }


//     return (
//         <div>
//             <form onSubmit={addNote}>
//                 <input name="note" />
//                 <button type='submit'>add</button>
//             </form>
//             <h2>notes</h2>
//             <ul>
//                 {store.getState().map(note => 
//                     <li 
//                         key={note.id}
//                         onClick={() => toggleImportance(note.id)}
//                     >
//                         {note.content} <strong>{note.important ? 'important': ''}</strong>
//                     </li>
//                     )}
//             </ul>
//         </div>
//     )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// const renderApp = () => root.render(<App />)

// renderApp()
// store.subscribe(renderApp)