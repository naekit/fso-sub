/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"

const initialState =  [
        { content: 'reducer defines how redux store works', important: true, id: 1 },
        { content: 'state of store can contain any data', important: false, id: 2 }
    ]

const generateId = () => Number((Math.random() * 100000000).toFixed(0))

const noteSlice = createSlice({
    name: 'notes',
    initialState: [],
    reducers: {
        createNote(state, action) {
            state.push(action.payload)
        },
        toggleImportanceOf(state, action) {
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

export const { createNote, toggleImportanceOf, appendNote, setNotes } = noteSlice.actions
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