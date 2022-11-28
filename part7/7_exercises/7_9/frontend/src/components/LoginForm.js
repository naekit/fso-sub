import { useDispatch, useSelector } from "react-redux"
import styled from 'styled-components'
import { loginUser } from "../reducers/userReducer"
import Message from "./Message"
import Page from "./styledComponents/Page"

const LoginButton = styled.button`
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

const LoginForm = () => {

    const dispatch = useDispatch()
    const msgText = useSelector(({message}) => message.message)

    const handleLogin = async (event) => {
        event.preventDefault()
        const userObj = {
          username: event.target.username.value,
          password: event.target.password.value
        }
        dispatch(loginUser(userObj))
    }

    return (
      <Page>
        <form onSubmit={handleLogin}>
          {msgText && <Message text={msgText} type={'error'} />}
          <div>
            <input
              id='username'
              type="text"
              placeholder='username'
              name='Username'
            />
          </div>
          <div>
            <input
              id='password'
              type="password"
              placeholder='password'
              name='Password'
            />
          </div>
          <LoginButton type='submit'>login</LoginButton>
        </form>
      </Page>
    )
}

export default LoginForm