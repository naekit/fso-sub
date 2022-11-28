import { useSelector, useDispatch } from "react-redux"
import { addComment, addLike, deleteBlog } from '../reducers/blogReducer'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const CommentBtn = styled.button`
  background: white;
  padding: 1em;
  font-weight: 700;
  color: black;
  width: 100%;
  border: black 1px solid;
  transition: all 200ms;
  &:hover{
    border-right: black 4px solid;
    border-bottom: black 4px solid;
    cursor: pointer;
  }
`
const Split = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    color: black;
    margin: 2rem 0;
`

const LikeButton = styled.button`
  padding: 1rem;
  background: white;
  transition: all 200ms;
  &:hover{
    border-right: black 4px solid;
    border-bottom: black 4px solid;
    cursor: pointer;
  }
`
const RemoveButton = styled.button`
  padding: 0.2rem;
  background: rgba(220,100,100,0.8);
  color: white;
  width: 100%;
  transition: all 200ms;
  font-weight: 700;
  &:hover{
    border-right: black 4px solid;
    border-bottom: black 4px solid;
    color: black;
    cursor: pointer;
  }
`



const Blog = ({blog}) => {
  
  const dispatch = useDispatch()
  const user = useSelector(({user}) => user)
  const blogs = useSelector(({blogs}) => blogs)
  const navigate = useNavigate()

  if(!blog){
    return null
  }
  const handleLike = (blogContent) => {
    dispatch(addLike(blogContent))
  }

  
  const remove = (id) => {
    const b = blogs.filter(b => b.id === id)[0]
    if(window.confirm(`Remove blog ${b.title} by ${b.author}`)){
      dispatch(deleteBlog(id))
      navigate('/')
    }
  }

  const RemoveBtn = () => {
      return (
        <div>
          {user.username === blog.user.username
            ? <RemoveButton onClick={() => remove(blog.id)} className='remove'>
                remove post
              </RemoveButton>
            : null
          }
        </div>
      )
    
  }

  const sendComment = (event) => {
    event.preventDefault()
    const commentObj = {
      text: event.target.comment.value
    }
    dispatch(addComment(blog.id, commentObj))
    event.target.comment.value = ''
  }


  return (
    <div>
       <div className="blog">
          <div>
            <Split>
              <div>
                <p>{blog.title} by <i>{blog.author}</i></p>
                <a href={blog.url}>{blog.url}</a>
              </div>
              <div>
                <LikeButton onClick={() => handleLike(blog)}>
                  Like: <span>{blog.likes}</span>
                </LikeButton>
              </div>
            </Split>
            {blog.user ? <p>user: {blog.user.username}</p>: null}
            {blog.user ? <RemoveBtn />: null}
            <form onSubmit={(e) => sendComment(e)}>
              <input name="comment" type="text" placeholder="comment"></input>
              <CommentBtn type="submit">comment</CommentBtn>
            </form>
            {blog.comments[0] &&
            <>
              <h3>comments</h3>
              <ul>
                {blog.comments.map(comment => 
                  <li key={comment.id}>{comment.text}</li>
                )}
              </ul>
            </>
            }
          </div>
        </div>
    </div>
  )}

export default Blog