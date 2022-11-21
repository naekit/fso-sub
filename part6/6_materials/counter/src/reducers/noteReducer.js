/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"
import noteService from "../services/notes"


const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        importantNote(state, action) {
            const note = action.payload
            return state.map(n => n.id !== note.id ? n: note)
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        }
    }
})

export const { importantNote, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
    return async dispatch => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}

export const createNote = (content) => {
    return async dispatch => {
        const newNote = await noteService.createNew(content)
        dispatch(appendNote(newNote))
    }
}

export const toggleImportanceOf = (note) => {
    return async dispatch => {
        const toggledNote = await noteService.updateNote(note)
        dispatch(importantNote(toggledNote))
    }
}

export default noteSlice.reducer

// const noteReducer = (state = initialState.notes, action) => {
//     switch(action.type){
//         case 'NEW_NOTE':
//             return [...state, action.data]
//         case 'TOGGLE_IMPORTANCE':{
//             const id = action.data.id
//             const noteToChange = state.find(n => n.id === id)
//             const changedNote = {
//                 ...noteToChange,
//                 important: !noteToChange.important
//             }
//             return state.map(note =>
//                 note.id !== id ? note : changedNote
//                 )
//             }
//         default:
//             return state
//     }
// }

// export const createNote = (content) => {
//     return {
//         type: 'NEW_NOTE',
//         data: {
//             content,
//             important: false,
//             id: generateId()
//         }
//     }
// }

// export const toggleImportanceOf = (id) => {
//     return {
//         type: 'TOGGLE_IMPORTANCE',
//         data: { id }
//     }
// }


// export default noteReducer
// store.dispatch({
//     type: 'NEW_NOTE',
//     data: {
//         content: 'the app state is in redux store',
//         important: true,
//         id: 1
//     }
// })

// store.dispatch({
//     type: 'NEW_NOTE',
//     data: {
//         content: 'state changes are made with actions',
//         important: false,
//         id: 2
//     }
// })

// const App = () => {
//     return (
//         <div>
//             <h2>notes</h2>
//             <ul>
//                 {store.getState().map(note => 
//                     <li key={note.id}>
//                         {note.content} <strong>{note.important ? 'important': ''}</strong>
//                     </li>
//                     )}
//             </ul>
//         </div>
//     )
// }

// const root = ReactDOM.createRoot(document.getElementById('root'));
// // const renderApp = () => root.render(<App />)

// renderApp()
// store.subscribe(renderApp)
