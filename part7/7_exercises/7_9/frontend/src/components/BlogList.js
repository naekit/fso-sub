import Message from './Message'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'
import Toggle from './Toggle'
import { addBlog } from '../reducers/blogReducer'
import { setMsg } from '../reducers/msgReducer'
import { useSelector, useDispatch } from 'react-redux'
import { useRef } from 'react'
import BlogLink from './styledComponents/BlogLink'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;

  &:hover{
    color: orange;
  }
`

const BlogList = () => {
    const dispatch = useDispatch()

    const blogs = useSelector(({blogs}) => blogs)
    const msgText = useSelector(({message}) => message.message)
  
    // reference for blogForm
    const blogFormRef = useRef()

    const handleBlog = (obj) => {
        blogFormRef.current.toggleVisibility()
        dispatch(addBlog(obj))
        dispatch(setMsg(`added ${obj.title} by ${obj.author}`))
    }

    
    const blogForm = () => (
      <Toggle label={'add blog'} ref={blogFormRef}>
          <BlogForm
            submit={handleBlog}
            />
        </Toggle>
    ) 

    return (
        <div>
          {msgText && <Message text={msgText} type={'success'} />}
          <h2>blogs</h2>
          {blogForm()}
            {blogs.map(blog =>
            <StyledLink key={blog.id} to={`/${blog.id}`}>
              <BlogLink>
                {blog.title}
              </BlogLink> 
            </StyledLink>
            )}
        </div>
    )
}

export default BlogList