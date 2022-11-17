import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Message from './components/Message'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [msgText, setText] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogObj, setBlogObj] = useState({title:'', author:'', url:''})

  // useEffect to check if logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('userAppToken')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log('tokenized log in');
    }
  }, [])

  // useEffect to get all blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
      console.log(user)
    } catch (exception) {
      setText(`wrong username or password`)
      setTimeout(() => {
        setText(null)
      }, 5000)
    }
    console.log(user, password)
  }

  // logOut
  const logOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    window.location.reload()
  }

  // handleBlog
  const handleBlog = async (event) => {
    event.preventDefault()
    try {
      const addedNew = await blogService.create(blogObj)

      setBlogs(blogs.concat(addedNew))

      setText(`a new blog ${blogObj.title} by ${blogObj.author} added`)
      setTimeout(() => {
        setText(null)
      }, 5000)

      setBlogObj({title: '', author: '', url: ''})
    } catch (error) {
      console.log(error)
    }
  }

  // handleBlogForm
  const handleBlogForm = (event) => {
    setBlogObj({...blogObj, [event.target.name]: event.target.value})
  }

  // login form
  const LoginForm = () => (
    <form onSubmit={handleLogin}>
      {msgText && <Message text={msgText} type={'error'} />}
      <div>
        <input
          type="text"
          placeholder='username'
          name='Username'
          value={username} 
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder='password'
          name='Password'
          value={password} 
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )

  // new blog form
  const BlogForm = () => (
    <form onSubmit={handleBlog}>
      <div>
        <input
          type="text"
          placeholder='title'
          name='title'
          value={blogObj.title} 
          onChange={handleBlogForm}
        />
      </div>
      <div>
        <input
          type="author"
          placeholder='author'
          name='author'
          value={blogObj.author} 
          onChange={handleBlogForm}
        />
      </div>
      <div>
        <input
          type="url"
          placeholder='url'
          name='url'
          value={blogObj.url} 
          onChange={handleBlogForm}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )
  return (
    <div>
      {user === null ?
      LoginForm():
      <div>
        <h2>blogs</h2>
        {msgText && <Message text={msgText} type={'success'} />}
        <p>{user.name} logged in <button onClick={logOut}>log out</button></p>
        {BlogForm()}
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }
    </div>
  )
}

export default App
