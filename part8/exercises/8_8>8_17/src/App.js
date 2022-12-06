import { useEffect, useState } from 'react'
import { useQuery, useMutation, useSubscription ,useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'
import Recommend from './components/Recommend'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }
  

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      notify(data)
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

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
      <Notify errorMessage={errorMessage} />

      <Authors show={page === 'authors'} authors={authors.data.allAuthors}/>
      
      <Books show={page === 'books'} books={books.data.allBooks}/>

      <NewBook show={page === 'add'} />
      
      <LoginForm page={page} show={page === 'login'} setToken={setToken} setPage={setPage}/>

      <Recommend page={page} booksShow={books.data.allBooks} />
    </div>
  )
}

export default App
