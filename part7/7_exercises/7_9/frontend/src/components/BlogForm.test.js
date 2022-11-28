import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('form is submitted with proper data', async () => {
    const submitFn = jest.fn()
    const user = userEvent.setup()

    render(<BlogForm submit={submitFn} />)

    const submitBtn = screen.getByText('create')

    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')

    await user.type(title, 'test form')
    await user.type(author, 'niko')
    await user.type(url, 'yay.com')

    await user.click(submitBtn)

    console.log(submitFn.mock.calls[0][0].title)
    expect(submitFn.mock.calls).toHaveLength(1)
    expect(submitFn.mock.calls[0][0].title).toBe('test form')
    expect(submitFn.mock.calls[0][0].author).toBe('niko')
    expect(submitFn.mock.calls[0][0].url).toBe('yay.com')
  })
})