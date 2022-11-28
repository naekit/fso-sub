import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  const blogObj = {
    title: 'testing',
    author: 'niko',
    url: 'wee.com',
    likes: 2,
    user: { username: 'niko' },
  }
  const user = {
    username: 'niko'
  }
  const testFn = jest.fn()
  let container

  beforeEach(() =>
  { container = render(
    <Blog
      blog={blogObj}
      user={user}
      addLike={testFn}
      remove={testFn}
    />
  ).container
  })

  test('renders blog title and author but not url or likes by default', () => {
    const div = container.querySelector('.blog')
    const hiddenInfo = container.querySelector('.info')

    expect(div).toHaveTextContent('testing niko')
    expect(hiddenInfo).toBeNull()
  })

  test('shows info when button to show is pressed', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.hide')

    await user.click(button)
    const div = container.querySelector('.info')

    screen.debug()
    expect(div).not.toHaveStyle('display: none')

  })

  test('clicks like button twice', async () => {
    const user = userEvent.setup()
    const button = container.querySelector('.hide')

    await user.click(button)
    const likeButton = container.querySelector('.like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(testFn.mock.calls).toHaveLength(2)
  })
})