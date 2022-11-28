import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'
import styled from 'styled-components'

const ToggleButton = styled.button`
  background: rgb(0,200,230);
  padding: 1em;
  font-weight: 700;
  color: white;
  width: 100%;
  border: white 2px solid;
  transition: all 200ms;
  &:hover{
    border-right: black 4px solid;
    border-bottom: black 4px solid;
    cursor: pointer;
  }
`

const Toggle = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '': 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <ToggleButton onClick={ toggleVisibility }>{props.label}</ToggleButton>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <ToggleButton onClick={ toggleVisibility }>cancel</ToggleButton>
      </div>
    </div>
  )
})

Toggle.propTypes = {
  label: PropTypes.string.isRequired
}

Toggle.displayName = 'Toggle'

export default Toggle