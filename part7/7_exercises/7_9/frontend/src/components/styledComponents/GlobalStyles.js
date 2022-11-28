import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    html {
        font-size: 16px;
    }
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    body{
        background: lightblue;
        font-family: 'Source Sans Pro', sans-serif;
    }
    input{
        width: 100%;
        padding: 0.6rem 0.2rem;
        background: white;
        border: 1px solid slategrey;
        font-size: 1rem;
    }
    h2{
        color: white;
        text-decoration: underline black;
    }
`

export default GlobalStyles