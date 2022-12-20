import useSignIn from '../hooks/useSignIn';
import SignInContainer from './SignInContainer';
import { useNavigate } from 'react-router-native'

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
        const { data } = await signIn({username, password});
        navigate('/')
        console.log(data)
    } catch (error) {
        console.log(error)
    }
  }

  return <SignInContainer onSubmit={onSubmit} />
};

export default SignIn;