import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInContainer from '../components/SignInContainer';

describe('Sign In', () => { 
    it('Fills form and submits it', async () => {
        const onSubmitTest = jest.fn()

        const { getByPlaceholderText, getByText } = render(<SignInContainer onSubmit={onSubmitTest} />)
        

        const username = 'kalle'
        const password = 'password'

        fireEvent.changeText(getByPlaceholderText('username'), username)
        fireEvent.changeText(getByPlaceholderText('password'), password)
        fireEvent.press(getByText('Submit'))

        await waitFor(() => {
            expect(onSubmitTest).toHaveBeenCalledTimes(1)
            expect(onSubmitTest.mock.calls[0][0]).toEqual({username, password})
        })

    })
 })