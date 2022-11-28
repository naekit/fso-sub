import styled from 'styled-components'

const BlogLink = styled.div`
    padding: 1em;
    margin: 10px 0;
    background: white;
    color: black;
    border: black 1px solid;
    transition: all 200ms;
    &:hover{
        border-right: black 4px solid;
        border-bottom: black 4px solid;
        cursor: pointer;
    }
`
export default BlogLink