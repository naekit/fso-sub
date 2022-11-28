import { useSelector } from "react-redux";
import { 
    Link, 
    Routes, 
    Route,
    useMatch 
} from 'react-router-dom'
import styled from 'styled-components'
import BlogList from "./BlogList";
import UserList from "./UserList";
import User from "./User";
import Blog from "./Blog";
import NavBar from "./styledComponents/NavBar";

const NavLink = styled(Link)`
    color: black;
    background: white;
    text-decoration: none;
    padding: .4rem;
    margin-right: 0;
    &:hover{
        border-bottom: black 4px solid;
    }
`
const LogIn = styled.button`
    padding: .5rem;
    padding-top: 0.7rem;
    margin: 0;
    color: white;
    font-weight: 700;
    background: black;
    border: none;
    cursor:pointer;
`

const Nav = () => {
    let users = useSelector(({users}) => users)
    const match = useMatch('/users/:id')
    const matchBlog = useMatch('/:id')
    const userName = useSelector(({user}) => user.name)
    const blogs = useSelector(({blogs}) => blogs)

    const user = match
        ? users.find(user => user.id === match.params.id)
        : null

    const blog = matchBlog 
        ? blogs.find(blog => blog.id === matchBlog.params.id)
        : null
    
    const logOut = (event) => {
        event.preventDefault()
        window.localStorage.clear()
        window.location.reload()
    }
    
    return (
        <div>
            <NavBar>
                <div>
                    <NavLink to="/">blogs </NavLink>
                    <NavLink to="/users"> users</NavLink>
                </div>
                <div>
                <NavLink to="/users">
                    {userName} logged in 
                </NavLink>
                    <LogIn onClick={logOut}>log out</LogIn>
                </div>
            </NavBar>
            <Routes>
                <Route path="/" element={<BlogList />}/>
                <Route path="/:id" element={<Blog blog={blog} />} />
                <Route path="/users/" element={<UserList />}/>
                <Route path="/users/:id" element={<User user={user} />}/>
            </Routes>
        </div>
    )
}

export default Nav