import { useState } from 'react'

const Blog = ({ blog, user, addLike, remove }) => {
  const [blogInfo, setBlogInfo] = useState(false)

  const showBlog = () => {
    setBlogInfo(!blogInfo)
  }


  const RemovBtn = () => {
    if(blog.user){
      return (
        <div>
          {user.username === blog.user.username
            ? <button onClick={remove} className='remove'>remove</button>
            : null
          }
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  return (
    <div>
      { blogInfo
        ? <div className="blog">
          <button className='hide' onClick={showBlog}>hide</button>
          <div className='info'>
            <p>{blog.title} by <i>{blog.author}</i></p>
            <a href={blog.url}>{blog.url}</a>
            <button onClick={addLike} className='like'>like: <span>{blog.likes}</span></button>
            {blog.user ? <p>user: {blog.user.username}</p>: null}
            {<RemovBtn />}
          </div>
        </div>
        : <div className="blog">
          <button className='hide' onClick={showBlog}>show</button>
          <p>{blog.title} <i>{blog.author}</i></p>
        </div>
      }
    </div>
  )}

export default Blog