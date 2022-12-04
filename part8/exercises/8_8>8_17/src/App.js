import { useEffect, useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Recommend from './components/Recommend'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  useEffect(() => {
    const localToken = localStorage.getItem('books-user-token')
    if(localToken){
      setToken(localToken)
    }
  }, [token])
  
  if(authors.loading || books.loading){
    return <div>loading...</div>
  }


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token 
          ?
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={logout}>log out</button>
            </>
          : <button onClick={() => setPage('login')}>login</button>
        }
        
      </div>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors}/>
      
      <Books show={page === 'books'} books={books.data.allBooks}/>

      <NewBook show={page === 'add'} />
      
      <LoginForm page={page} show={page === 'login'} setToken={setToken} setPage={setPage}/>

      <Recommend page={page} booksShow={books.data.allBooks} />
    </div>
  )
}

export default App
