import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Message from './components/Message'
import Toggle from './components/Toggle'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [msgText, setText] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // reference for blogForm
  const blogFormRef = useRef()

  // useEffect to check if logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userAppToken')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // useEffect to get all blogs
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( blogs.sort((a,b) => b.likes - a.likes) )
    }
    )
  }, [])

  // get login info and set token
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem('userAppToken', JSON.stringify(user))
      setUser(user)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setText('wrong username or password')
      setTimeout(() => {
        setText(null)
      }, 5000)
    }
  }

  // logOut
  const logOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }

  // handleBlog
  const handleBlog = (obj) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(obj)
      .then(addedNew => {
        console.log(addedNew)
        setBlogs(blogs.concat(addedNew))

        setText(`a new blog ${obj.title} by ${obj.author} added`)
        setTimeout(() => {
          setText(null)
        }, 5000)
      })
  }
  // add like
  const addLike = (id) => {
    const blog = blogs.find(b => b.id === id)
    const newBlog = { ...blog, likes: blog.likes += 1 }

    blogService
      .update(id, newBlog)
      .then(changedBlog => {
        setBlogs(blogs.map(b => b.id === id ? changedBlog: b))
      })
      .catch(error => {
        console.log(error)
      })
  }

  // remove blog
  const remove = (id) => {
    const b = blogs.filter(b => b.id === id)[0]
    if(window.confirm(`Remove blog ${b.title} by ${b.author}`)){
      blogService
        .remove(id)
        .then(res => {
          console.log(res)
          setBlogs(blogs.filter(b => b.id !== id))
        })
        .catch(err => {
          console.error(err)
          setText('sorry not authorized')
          setTimeout(() => {
            setText(null)
          }, 5000)
        })
    }
    return
  }

  // login form
  const LoginForm = () => (
    <form onSubmit={handleLogin}>
      {msgText && <Message text={msgText} type={'error'} />}
      <div>
        <input
          id='username'
          type="text"
          placeholder='username'
          name='Username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          id='password'
          type="password"
          placeholder='password'
          name='Password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  // new blog form
  const blogForm = () => (
    <Toggle label={'add blog'} ref={blogFormRef}>
      <BlogForm
        submit={handleBlog}
      />
    </Toggle>
  )
  return (
    <div>
      {user === null ?
        LoginForm():
        <div>
          <h2>blogs</h2>
          {msgText && <Message text={msgText} type={'success'} />}
          <p>{user.name} logged in <button onClick={logOut}>log out</button></p>
          {blogForm()}
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              addLike={() => addLike(blog.id)}
              remove={() => remove(blog.id)}
            />
          )}
        </div>
      }
    </div>
  )
}

export default App
