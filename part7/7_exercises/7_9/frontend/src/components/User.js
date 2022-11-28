import BlogLink from "./styledComponents/BlogLink"
import { Link } from 'react-router-dom'

const User = ({ user }) => {
    if(!user){
        return null
    }
    return (
        <div>
            <h2>{user.username}</h2> 
             {user.blogs.map(blog =>
             <Link key={blog.id} to={`/${blog.id}`}>
                 <BlogLink>
                     {blog.title} by <strong>{blog.author}</strong>
                 </BlogLink>
             </Link>
             )}
        </div>
    )
}

export default User