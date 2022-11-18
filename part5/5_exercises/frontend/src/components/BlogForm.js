import {useState} from 'react'

const BlogForm = ({submit}) => {

    const [blogObj, setBlogObj] = useState({title:'', author:'', url:''})
    
    const handleBlogForm = (event) => {
        setBlogObj({...blogObj, [event.target.name]: event.target.value})
    }
    
    const addBlog = (event) => {
      event.preventDefault()
      submit(blogObj)

      setBlogObj({title: '', author: '', url: ''})
    }

    return (
    <form onSubmit={addBlog}>
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
}
export default BlogForm