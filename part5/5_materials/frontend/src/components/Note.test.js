import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component is done with react-testing-library',
    important: true
  }
  // one way of testing is by rendering
  //   render(<Note note={note} />)
  // and grabbing the element with .getByText() function then expecting(element)
  //   const element = screen.getByText('Component is done with react-testing-library')
  //   expect(element).toBeDefined()
  // other way is to check container for classes with name of element
  const { container } = render(<Note note={note}/>)

  const div = container.querySelector('.note')
  // shows html in console VVVV
  //   screen.debug(div)

  expect(div).toHaveTextContent(
    'Component is done with react-testing-library'
  )
})

test('clicking the button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true
  }

  const mockHandler = jest.fn()

  render(
    <Note note={note} toggleImportance={mockHandler} />
  )

  const user = userEvent.setup()
  const button = screen.getByText('to not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
})
