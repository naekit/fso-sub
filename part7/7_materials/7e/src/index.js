import 'core-js/stable/index'
import 'regenerator-runtime'
import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';

const hello = name => {
    console.log(`hello ${name}`)
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)