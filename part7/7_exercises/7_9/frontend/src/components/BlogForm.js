import styled from 'styled-components'

const CreateButton = styled.button`
  background: rgb(0,200,230);
  padding: 1em;
  font-weight: 700;
  color: white;
  width: 100%;
  border: white 2px solid;
  border-bottom: none;
  transition: all 200ms;
  &:hover{
    border-right: black 4px solid;
    border-bottom: black 4px solid;
    cursor: pointer;
  }
`

const BlogForm = ({ submit }) => {

  const handleBlog = (event) => {
    event.preventDefault()
    const blogObj = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    submit(blogObj)

  }

  return (
    <form onSubmit={(e) => handleBlog(e)}>
      <div>
        <input
          id='title'
          type="text"
          placeholder='title'
          name='title'
        />
      </div>
      <div>
        <input
          id='author'
          type="author"
          placeholder='author'
          name='author'
        />
      </div>
      <div>
        <input
          id='url'
          type="url"
          placeholder='url'
          name='url'
        />
      </div>
      <CreateButton type='submit'>create</CreateButton>
    </form>
  )
}
export default BlogForm