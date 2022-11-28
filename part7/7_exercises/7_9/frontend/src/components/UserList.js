import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import BlogLink from "./styledComponents/BlogLink";

const Split = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    color: black;
`
const Pblack = styled.p`
    color: black;
`

const UserList = () => {
    let users = useSelector(({users}) => users)

    return(
        <>
        <Split>
            <Pblack>User</Pblack>
            <Pblack>Blogs</Pblack>
        </Split>
        {users.map(user =>
        <Link to={`/users/${user.id}`}>
        <BlogLink>
            <Split key={user.id}>
                <div>
                    {user.username}
                </div>
                <div>
                    <span>{user.blogs.length}</span>
                </div>
            </Split> 
        </BlogLink>
        </Link>
        )}
        </>
    )
}

export default UserList