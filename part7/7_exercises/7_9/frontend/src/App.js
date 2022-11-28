import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setToken } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import Nav from './components/Nav'
import LoginForm from './components/LoginForm'
import Page from './components/styledComponents/Page'
import GlobalStyles from './components/styledComponents/GlobalStyles'

const App = () => {

  const dispatch = useDispatch()
  // useEffect to check log in and init state
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(setToken())
    dispatch(initializeUsers())
  }, [dispatch])

  const user = useSelector(({user}) => user)

  return (
    <Page>
      <GlobalStyles />
      {user.token === null 
        ? <LoginForm />
        : <div>
            <Nav />
          </div>
      }
    </Page>
  )
}

export default App
